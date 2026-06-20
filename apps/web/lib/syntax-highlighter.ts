import { PrismLight } from 'react-syntax-highlighter'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import docker from 'react-syntax-highlighter/dist/esm/languages/prism/docker'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx'
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown'
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup'
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss'
import toml from 'react-syntax-highlighter/dist/esm/languages/prism/toml'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import yaml from 'react-syntax-highlighter/dist/esm/languages/prism/yaml'
import vs from 'react-syntax-highlighter/dist/esm/styles/prism/vs'
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus'

const DOCKERFILE_NAME = /^dockerfile(\..+)?$/

PrismLight.registerLanguage('bash', bash)
PrismLight.registerLanguage('css', css)
PrismLight.registerLanguage('docker', docker)
PrismLight.registerLanguage('javascript', javascript)
PrismLight.registerLanguage('json', json)
PrismLight.registerLanguage('jsx', jsx)
PrismLight.registerLanguage('markdown', markdown)
PrismLight.registerLanguage('markup', markup)
PrismLight.registerLanguage('scss', scss)
PrismLight.registerLanguage('toml', toml)
PrismLight.registerLanguage('tsx', tsx)
PrismLight.registerLanguage('typescript', typescript)
PrismLight.registerLanguage('yaml', yaml)

export const SyntaxHighlighter = PrismLight

export const syntaxHighlighterThemes = {
  light: vs,
  dark: vscDarkPlus,
}

export function languageFromPath(path: string) {
  const fileName = path.split('/').pop()?.toLowerCase() ?? ''
  const ext = fileName.split('.').pop()

  if (DOCKERFILE_NAME.test(fileName)) {
    return 'docker'
  }

  switch (ext) {
    case 'bash':
    case 'sh':
    case 'zsh':
      return 'bash'
    case 'css':
      return 'css'
    case 'dockerfile':
      return 'docker'
    case 'htm':
    case 'html':
    case 'svg':
    case 'xml':
      return 'markup'
    case 'js':
    case 'cjs':
    case 'mjs':
      return 'javascript'
    case 'json':
      return 'json'
    case 'jsx':
      return 'jsx'
    case 'md':
    case 'markdown':
      return 'markdown'
    case 'scss':
      return 'scss'
    case 'toml':
      return 'toml'
    case 'ts':
      return 'typescript'
    case 'tsx':
      return 'tsx'
    case 'yaml':
    case 'yml':
      return 'yaml'
    default:
      return
  }
}
