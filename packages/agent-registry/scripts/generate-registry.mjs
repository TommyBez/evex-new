import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const CHECK_FLAG = '--check'
const GENERATED_FILE = 'src/generated/registry.ts'
const REGISTRY_FILE_TYPE = 'registry:file'
const REGISTRY_ITEM_TYPE = 'registry:item'
const REGISTRY_SCHEMA_URL = 'https://ui.shadcn.com/schema/registry.json'
const HIGH_SURROGATE_START = 0xd8_00
const LOW_SURROGATE_START = 0xdc_00
const MAX_ASCII_CODE_POINT = 0x7f
const MAX_BASIC_MULTILINGUAL_PLANE = 0xff_ff
const SURROGATE_BLOCK_SIZE = 1024
const UNICODE_ASTRAL_OFFSET = 0x1_00_00

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const packageRoot = path.resolve(scriptDir, '..')
const agentsDir = path.join(packageRoot, 'agents')
const generatedPath = path.join(packageRoot, GENERATED_FILE)

function toPosixPath(filePath) {
  return filePath.split(path.sep).join(path.posix.sep)
}

function isRecord(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, 'utf8')
  try {
    return JSON.parse(raw)
  } catch (error) {
    throw new Error(`Invalid JSON in ${filePath}.`, { cause: error })
  }
}

function getRegistryItem(registryJson, registryPath) {
  if (!Array.isArray(registryJson.items) || registryJson.items.length !== 1) {
    throw new Error(`${registryPath} must define exactly one registry item.`)
  }

  const [item] = registryJson.items
  if (!isRecord(item)) {
    throw new Error(`${registryPath} item must be an object.`)
  }

  if (item.type !== REGISTRY_ITEM_TYPE) {
    throw new Error(
      `${registryPath} item type must be "${REGISTRY_ITEM_TYPE}".`,
    )
  }

  if (typeof item.name !== 'string' || item.name.length === 0) {
    throw new Error(`${registryPath} item must define a non-empty name.`)
  }

  return item
}

function validateDependencies(item, registryPath) {
  if (!item.dependencies) {
    return
  }

  if (!Array.isArray(item.dependencies)) {
    throw new Error(`${registryPath} item dependencies must be an array.`)
  }

  for (const dependency of item.dependencies) {
    if (typeof dependency !== 'string' || dependency.length === 0) {
      throw new Error(`${registryPath} item dependencies must be strings.`)
    }
  }
}

function normalizeSourceFilePath(filePath, registryPath) {
  if (typeof filePath !== 'string' || filePath.length === 0) {
    throw new Error(`${registryPath} file path must be a non-empty string.`)
  }

  if (path.isAbsolute(filePath) || filePath.includes('\\')) {
    throw new Error(`${registryPath} file path must be a relative POSIX path.`)
  }

  const normalizedPath = path.posix.normalize(filePath)
  if (normalizedPath !== filePath || normalizedPath.startsWith('../')) {
    throw new Error(`${registryPath} file path must not traverse directories.`)
  }

  if (normalizedPath !== 'README.md' && !normalizedPath.startsWith('agent/')) {
    throw new Error(
      `${registryPath} file path must be README.md or live under agent/.`,
    )
  }

  return normalizedPath
}

async function readRegistryFiles(item, agentRoot, registryPath) {
  if (!Array.isArray(item.files)) {
    throw new Error(`${registryPath} item files must be an array.`)
  }

  const files = []

  for (const file of item.files) {
    if (!isRecord(file)) {
      throw new Error(`${registryPath} item files must be objects.`)
    }

    if (file.type !== REGISTRY_FILE_TYPE) {
      throw new Error(
        `${registryPath} file type must be "${REGISTRY_FILE_TYPE}".`,
      )
    }

    const sourcePath = normalizeSourceFilePath(file.path, registryPath)
    const absoluteSourcePath = path.join(agentRoot, sourcePath)
    const relativeSourcePath = toPosixPath(
      path.relative(agentRoot, absoluteSourcePath),
    )

    if (relativeSourcePath !== sourcePath) {
      throw new Error(`${registryPath} file path must stay inside the agent.`)
    }

    await fs.access(absoluteSourcePath)

    files.push({
      ...file,
      path: sourcePath,
      sourcePath: absoluteSourcePath,
    })
  }

  return files
}

function toCatalogFile(file) {
  const { content: _content, sourcePath: _sourcePath, ...descriptor } = file
  return {
    ...descriptor,
  }
}

async function toItemFile(file) {
  return {
    ...toCatalogFile(file),
    content: await fs.readFile(file.sourcePath, 'utf8'),
  }
}

async function buildAgentEntry(agentSlug) {
  const agentRoot = path.join(agentsDir, agentSlug)
  const registryPath = path.join(agentRoot, 'registry.json')
  const registryJson = await readJson(registryPath)
  const item = getRegistryItem(registryJson, registryPath)

  if (item.name !== agentSlug) {
    throw new Error(`${registryPath} item name must match "${agentSlug}".`)
  }

  validateDependencies(item, registryPath)

  const files = await readRegistryFiles(item, agentRoot, registryPath)
  const { files: _files, ...metadata } = item

  return {
    catalogItem: {
      ...metadata,
      files: files.map(toCatalogFile),
    },
    registryItem: {
      $schema: REGISTRY_SCHEMA_URL,
      ...metadata,
      files: await Promise.all(files.map(toItemFile)),
    },
  }
}

async function readAgentSlugs() {
  const entries = await fs.readdir(agentsDir, { withFileTypes: true })
  return entries
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
    .map((entry) => entry.name)
    .toSorted((left, right) => left.localeCompare(right))
}

function escapeNonAscii(value) {
  let result = ''

  for (const character of value) {
    const codePoint = character.codePointAt(0)
    if (typeof codePoint !== 'number') {
      result += character
      continue
    }

    if (codePoint <= MAX_ASCII_CODE_POINT) {
      result += character
      continue
    }

    if (codePoint <= MAX_BASIC_MULTILINGUAL_PLANE) {
      result += `\\u${codePoint.toString(16).padStart(4, '0')}`
      continue
    }

    const normalizedCodePoint = codePoint - UNICODE_ASTRAL_OFFSET
    const highSurrogate =
      HIGH_SURROGATE_START +
      Math.floor(normalizedCodePoint / SURROGATE_BLOCK_SIZE)
    const lowSurrogate =
      LOW_SURROGATE_START + (normalizedCodePoint % SURROGATE_BLOCK_SIZE)

    result += `\\u${highSurrogate.toString(16).padStart(4, '0')}\\u${lowSurrogate.toString(16).padStart(4, '0')}`
  }

  return result
}

function stringifyForTypescript(value) {
  return escapeNonAscii(JSON.stringify(value, null, 2))
}

function createGeneratedSource(registry, registryItemsByName) {
  return `import type { RegistryCatalog, RegistryItem } from '../types'

export const generatedRegistry = ${stringifyForTypescript(registry)} as const satisfies RegistryCatalog

export const generatedRegistryItems = ${stringifyForTypescript(registryItemsByName)} as const satisfies Record<string, RegistryItem>
`
}

async function buildGeneratedSource() {
  const agentSlugs = await readAgentSlugs()
  const catalogItems = []
  const registryItemsByName = {}

  for (const agentSlug of agentSlugs) {
    const { catalogItem, registryItem } = await buildAgentEntry(agentSlug)
    catalogItems.push(catalogItem)
    registryItemsByName[agentSlug] = registryItem
  }

  const registry = {
    $schema: REGISTRY_SCHEMA_URL,
    name: 'evex',
    homepage: 'https://evex.sh',
    items: catalogItems,
  }

  return createGeneratedSource(registry, registryItemsByName)
}

async function main() {
  const isCheck = process.argv.includes(CHECK_FLAG)
  const generatedSource = await buildGeneratedSource()

  if (isCheck) {
    const currentSource = await fs.readFile(generatedPath, 'utf8')
    if (currentSource !== generatedSource) {
      process.stderr.write(
        `${GENERATED_FILE} is out of date. Run "pnpm --filter @evex/agent-registry generate".\n`,
      )
      process.exitCode = 1
    }
    return
  }

  await fs.mkdir(path.dirname(generatedPath), { recursive: true })
  await fs.writeFile(generatedPath, generatedSource)
}

await main()
