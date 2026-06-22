import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const REGISTRY_SCHEMA_URL = 'https://ui.shadcn.com/schema/registry.json'
const README_TITLE_PATTERN = /^#\s+(.+)$/m
const LINE_SPLIT_PATTERN = /\r?\n/

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const packageRoot = path.resolve(scriptDir, '..')
const agentsDir = path.join(packageRoot, 'agents')

function toPosixPath(filePath) {
  return filePath.split(path.sep).join(path.posix.sep)
}

function titleizeSlug(slug) {
  return slug
    .split('-')
    .map((part) => `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`)
    .join(' ')
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, 'utf8'))
}

async function collectFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries.toSorted((left, right) =>
    left.name.localeCompare(right.name),
  )) {
    if (entry.name.startsWith('.')) {
      continue
    }

    const entryPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(entryPath)))
      continue
    }

    if (entry.isFile()) {
      files.push(entryPath)
    }
  }

  return files
}

function readReadmeTitle(readme, slug) {
  return readme.match(README_TITLE_PATTERN)?.[1]?.trim() ?? titleizeSlug(slug)
}

function readReadmeDescription(readme) {
  return (
    readme
      .split(LINE_SPLIT_PATTERN)
      .map((line) => line.trim())
      .find((line) => line && !line.startsWith('#')) ??
    'Describe what this agent does.'
  )
}

function readDependencies(packageJson) {
  return Object.entries(packageJson.dependencies ?? {}).map(
    ([name, range]) => `${name}@${range}`,
  )
}

function toTargetPath(relativePath) {
  return relativePath === 'README.md'
    ? '~/agent/README.md'
    : `~/${relativePath}`
}

async function buildFiles(agentRoot) {
  const sourceFiles = await collectFiles(path.join(agentRoot, 'agent'))
  sourceFiles.push(path.join(agentRoot, 'README.md'))

  return sourceFiles.map((sourcePath) => {
    const relativePath = toPosixPath(path.relative(agentRoot, sourcePath))
    return {
      path: relativePath,
      type: 'registry:file',
      target: toTargetPath(relativePath),
    }
  })
}

async function main() {
  const slug = process.argv.at(2)
  if (!slug) {
    throw new Error(
      'Usage: pnpm --filter @evex-new/agent-registry registry:scaffold <agent-slug>',
    )
  }

  const agentRoot = path.join(agentsDir, slug)
  const packageJson = await readJson(path.join(agentRoot, 'package.json'))
  const readme = await fs.readFile(path.join(agentRoot, 'README.md'), 'utf8')
  const now = new Date().toISOString()
  const category = 'general'
  const registry = {
    $schema: REGISTRY_SCHEMA_URL,
    items: [
      {
        name: slug,
        type: 'registry:item',
        title: readReadmeTitle(readme, slug),
        description: packageJson.description ?? readReadmeDescription(readme),
        author: 'evex-new',
        categories: [category],
        dependencies: readDependencies(packageJson),
        files: await buildFiles(agentRoot),
        meta: {
          slug,
          category,
          author: {
            id: 'evex-new',
            name: 'evex-new',
            url: 'https://evex-new.sh',
          },
          createdAt: now,
          updatedAt: now,
        },
      },
    ],
  }

  await fs.writeFile(
    path.join(agentRoot, 'registry.json'),
    `${JSON.stringify(registry, null, 2)}\n`,
  )
}

await main()
