import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const AGENTS_ROOT = path.join(REPO_ROOT, 'apps/agents')
const GENERATED_PATH = path.join(
  REPO_ROOT,
  'packages/agent-catalog/src/generated.ts',
)
const FORBIDDEN_SEGMENTS = new Set([
  '',
  '.eve',
  '.git',
  '.next',
  '.output',
  '.turbo',
  '.vercel',
  'dist',
  'node_modules',
])
const FORBIDDEN_FILENAMES = new Set([
  '.env',
  '.env.local',
  '.env.production',
  'pnpm-lock.yaml',
])
const PACKAGE_NAME_PATTERN = /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const WINDOWS_ABSOLUTE_PATH = /^[A-Za-z]:\//

function assertString(value, label) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${label} must be a non-empty string.`)
  }
  return value.trim()
}

function assertStringArray(value, label) {
  if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    throw new Error(`${label} must be an array of strings.`)
  }
  return value.map((item) => item.trim()).filter(Boolean)
}

function assertSafeRegistryPath(relativePath) {
  const normalized = relativePath.replace(/\\/g, '/')
  const segments = normalized.split('/')
  const filename = segments.at(-1) ?? ''

  if (
    normalized.startsWith('/') ||
    WINDOWS_ABSOLUTE_PATH.test(normalized) ||
    segments.includes('..') ||
    segments.some((segment) => FORBIDDEN_SEGMENTS.has(segment)) ||
    FORBIDDEN_FILENAMES.has(filename)
  ) {
    throw new Error(`Invalid agent app file path: ${relativePath}`)
  }

  return normalized
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, 'utf8'))
}

async function listFiles(root, dir = '') {
  const entries = await fs.readdir(path.join(root, dir), { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const relativePath = dir ? `${dir}/${entry.name}` : entry.name
    if (entry.isDirectory() && FORBIDDEN_SEGMENTS.has(entry.name)) {
      continue
    }
    const safePath = assertSafeRegistryPath(relativePath)
    if (entry.isDirectory()) {
      files.push(...(await listFiles(root, safePath)))
      continue
    }
    if (entry.isFile()) {
      files.push(safePath)
    }
  }

  return files.sort((left, right) => left.localeCompare(right))
}

function validateManifest(manifest, slug) {
  if (manifest.schemaVersion !== 1) {
    throw new Error(`${slug}: schemaVersion must be 1.`)
  }

  const manifestSlug = assertString(manifest.slug, `${slug}: slug`)
  if (manifestSlug !== slug) {
    throw new Error(`${slug}: manifest slug must match directory name.`)
  }
  if (!SLUG_PATTERN.test(manifestSlug)) {
    throw new Error(`${slug}: slug must be URL-safe kebab-case.`)
  }

  const author = manifest.author
  if (!author || typeof author !== 'object') {
    throw new Error(`${slug}: author is required.`)
  }

  return {
    slug: manifestSlug,
    name: assertString(manifest.name, `${slug}: name`),
    title: assertString(manifest.title, `${slug}: title`),
    description: assertString(manifest.description, `${slug}: description`),
    category: assertString(manifest.category, `${slug}: category`),
    author: {
      id: assertString(author.id, `${slug}: author.id`),
      name: assertString(author.name, `${slug}: author.name`),
      ...(author.url ? { url: assertString(author.url, `${slug}: author.url`) } : {}),
      ...(author.avatarUrl
        ? { avatarUrl: assertString(author.avatarUrl, `${slug}: author.avatarUrl`) }
        : {}),
    },
    dependencies: assertStringArray(manifest.dependencies, `${slug}: dependencies`),
    createdAt: assertString(manifest.createdAt, `${slug}: createdAt`),
    updatedAt: assertString(manifest.updatedAt, `${slug}: updatedAt`),
  }
}

async function buildCatalog() {
  const entries = await fs.readdir(AGENTS_ROOT, { withFileTypes: true })
  const agents = []
  const slugs = new Set()

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue
    }

    const slug = entry.name
    if (slugs.has(slug)) {
      throw new Error(`Duplicate agent slug: ${slug}`)
    }
    slugs.add(slug)

    const appRoot = path.join(AGENTS_ROOT, slug)
    const manifest = validateManifest(
      await readJson(path.join(appRoot, 'agent.catalog.json')),
      slug,
    )
    const packageJson = await readJson(path.join(appRoot, 'package.json'))
    if (!PACKAGE_NAME_PATTERN.test(String(packageJson.name ?? ''))) {
      throw new Error(`${slug}: package.json name is invalid.`)
    }

    const files = await listFiles(appRoot)
    if (!files.includes('package.json')) {
      throw new Error(`${slug}: package.json is required.`)
    }
    if (!files.includes('agent/instructions.md')) {
      throw new Error(`${slug}: agent/instructions.md is required.`)
    }

    agents.push({
      ...manifest,
      appRoot: `apps/agents/${slug}`,
      files: await Promise.all(
        files.map(async (filePath) => ({
          path: filePath,
          type: 'registry:file',
          content: await fs.readFile(path.join(appRoot, filePath), 'utf8'),
        })),
      ),
    })
  }

  return agents.sort((left, right) => left.slug.localeCompare(right.slug))
}

function formatGeneratedFile(agents) {
  return [
    "import type { CatalogAgent } from './types'",
    '',
    `export const catalogAgents: readonly CatalogAgent[] = ${JSON.stringify(agents, null, 2)}`,
    '',
  ].join('\n')
}

const checkOnly = process.argv.includes('--check')
const nextContents = formatGeneratedFile(await buildCatalog())
let currentContents = ''

try {
  currentContents = await fs.readFile(GENERATED_PATH, 'utf8')
} catch (error) {
  if (error.code !== 'ENOENT') {
    throw error
  }
}

if (checkOnly) {
  if (currentContents !== nextContents) {
    throw new Error(
      'Agent catalog is out of date. Run `pnpm agents:sync` and commit the generated file.',
    )
  }
} else if (currentContents !== nextContents) {
  await fs.writeFile(GENERATED_PATH, nextContents)
}
