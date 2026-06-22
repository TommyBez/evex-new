const GITHUB_PROFILE_URL = 'https://github.com'

export function githubUsernameKey(username: string | null | undefined): string {
  return username?.trim().toLowerCase() ?? ''
}

export function githubProfileUrl(username: string): string {
  return `${GITHUB_PROFILE_URL}/${encodeURIComponent(username)}`
}

export function readGithubUsername(value: unknown): string | null {
  if (typeof value !== 'string') {
    return null
  }

  const username = value.trim()

  return username.length > 0 ? username : null
}
