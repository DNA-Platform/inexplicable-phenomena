# Monorepo

npm workspace management and GitHub Packages publishing for the `@dna-platform` scope.

---

## npm Workspaces

Managing a monorepo with npm's built-in workspace support. Workspaces allow multiple packages to coexist in one repository, depend on each other, and share a single `node_modules` tree.

### Setup

Root `package.json` declares workspace locations via glob patterns:

```json
{
  "name": "@dna-platform/inexplicable-phenomena",
  "private": true,
  "workspaces": [
    ".claude",
    ".eirian",
    "library/*",
    "library/**/*"
  ]
}
```

Key points:
- The root package is always `"private": true` — it's the container, never published
- Globs resolve to directories that contain a `package.json`
- `library/*` matches direct children; `library/**/*` matches nested children

### Workspace package.json

Each workspace needs at minimum:

```json
{
  "name": "@dna-platform/workspace-name",
  "version": "0.0.1",
  "private": true,
  "description": "What this workspace does"
}
```

- Scope all packages under `@dna-platform/` for GitHub Packages
- Start `private: true` — only flip to `false` when ready to publish
- Keep version at `0.0.1` until there's a reason to bump

### Cross-workspace dependencies

Workspaces can depend on each other by name:

```json
{
  "dependencies": {
    "@dna-platform/dictionary": "*"
  }
}
```

npm creates symlinks in `node_modules/@dna-platform/`. Changes are immediately visible. Use `*` for local deps.

### Hoisting

npm hoists shared dependencies to root `node_modules/`. **Gotcha:** A workspace can accidentally import a hoisted package it didn't declare. This works locally but breaks standalone. Always declare what you import.

### Running scripts

```bash
npm run build -w @dna-platform/public          # specific workspace
npm run build --workspaces                      # all workspaces
npm run build --workspaces --if-present         # all, ignore missing
```

### Constraints

- **No nesting:** A workspace cannot contain another workspace.
- **No circular dependencies:** npm will error.
- **Flat node_modules by default:** Use `--install-strategy=nested` if hoisting causes issues.

---

## GitHub Packages

Publishing npm packages to GitHub's package registry instead of the public npm registry.

### Registry configuration

`.npmrc` at repo root:
```
@dna-platform:registry=https://npm.pkg.github.com
```

Any `@dna-platform/*` package resolves from GitHub. Unscoped packages resolve from npm normally.

### Authentication

**Local development** — add to `~/.npmrc` (user-level, not committed):
```
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```
Token needs `read:packages` for install, `write:packages` for publish.

**CI (GitHub Actions):**
```yaml
- uses: actions/setup-node@v4
  with:
    registry-url: https://npm.pkg.github.com
    scope: '@dna-platform'
- run: npm publish
  env:
    NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Package setup for publishing

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

- `private` must be `false` to publish
- `publishConfig.registry` ensures publish goes to GitHub
- Package name MUST match the GitHub org scope: `@dna-platform/*`
- Versions must be unique — can't overwrite a published version

### Private vs public

The repository is public, so published packages would be publicly readable. Use `"private": true` to prevent accidental publish.
