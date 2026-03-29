# GitHub Packages

**Used by:** Architect (primary), DevOps

Publishing npm packages to GitHub's package registry instead of the public npm registry. Keeps packages scoped to the organization and accessible to anyone with repo access.

## Registry configuration

Create `.npmrc` at the repo root:

```
@dna-platform:registry=https://npm.pkg.github.com
```

This tells npm: any package scoped `@dna-platform/*` lives on GitHub's registry, not npmjs.com. Unscoped packages still resolve from npm normally.

## Authentication

GitHub Packages requires authentication even for installing (unless the packages are public).

**For local development:**
```
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Add this to `~/.npmrc` (user-level, not repo-level) so the token isn't committed. The token needs `read:packages` scope for install, `write:packages` for publish.

**For CI (GitHub Actions):**
```yaml
- uses: actions/setup-node@v4
  with:
    registry-url: https://npm.pkg.github.com
    scope: '@dna-platform'
- run: npm publish
  env:
    NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

`GITHUB_TOKEN` is automatically available in GitHub Actions with the right permissions.

## Package setup for publishing

In the workspace's `package.json`:

```json
{
  "name": "@dna-platform/workspace-name",
  "version": "0.0.1",
  "private": false,
  "publishConfig": {
    "registry": "https://npm.pkg.github.com"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/dna-platform/inexplicable-phenomena.git",
    "directory": "library/workspace-name"
  }
}
```

Key points:
- `private` must be `false` to publish
- `publishConfig.registry` ensures `npm publish` goes to GitHub, not npmjs.com
- `repository.directory` tells GitHub which folder in the monorepo this package maps to
- The package name MUST match the GitHub org scope: `@dna-platform/*`

## Publishing

```bash
# Publish a specific workspace
npm publish -w @dna-platform/workspace-name

# Publish from the workspace directory
cd library/workspace-name && npm publish
```

Versions must be unique — you can't overwrite a published version. Bump the version before publishing.

## Consuming packages

From another repo or workspace:

```bash
npm install @dna-platform/workspace-name
```

This pulls from GitHub Packages (assuming `.npmrc` is configured). Within the same monorepo, cross-workspace deps are symlinked, not downloaded.

## Private vs public packages

- `"private": true` in package.json means npm refuses to publish it. Use this for internal-only workspaces.
- Once published to GitHub Packages, a package is visible to anyone with repo access (for private repos) or everyone (for public repos).
- The repository `dna-platform/inexplicable-phenomena` is public, so published packages would be publicly readable.

## What to verify when using this ability

- [ ] `.npmrc` exists at repo root with the registry line
- [ ] All publishable packages have `publishConfig.registry` set
- [ ] All packages use `@dna-platform/` scope
- [ ] No auth tokens are committed (tokens go in user-level `~/.npmrc`)
- [ ] `repository.directory` matches the actual workspace path
- [ ] Private packages have `"private": true` to prevent accidental publish
