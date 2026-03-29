# npm Workspaces

**Used by:** Architect (primary), DevOps

Managing a monorepo with npm's built-in workspace support. Workspaces allow multiple packages to coexist in one repository, depend on each other, and share a single `node_modules` tree.

## Setup

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
- A directory without `package.json` is not a workspace, even if it matches a glob
- `library/*` matches direct children; `library/**/*` matches nested children

## Workspace package.json

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

## Cross-workspace dependencies

Workspaces can depend on each other by name:

```json
{
  "name": "@dna-platform/public",
  "dependencies": {
    "@dna-platform/dictionary": "*"
  }
}
```

npm creates symlinks in `node_modules/@dna-platform/` pointing to the actual workspace directories. This means:
- Changes in one workspace are immediately visible to dependents (no rebuild/reinstall)
- Version specifier `*` means "whatever version is in the workspace" — use this for local deps
- `npm install` at root resolves all cross-workspace links

## Hoisting

npm hoists shared dependencies to the root `node_modules/`. This means:
- If two workspaces depend on `typescript@5.x`, only one copy is installed at root
- Workspace-specific versions stay in the workspace's own `node_modules/`
- **Gotcha:** A workspace can accidentally import a hoisted package it didn't declare. This works locally but breaks if the workspace is consumed standalone. Always declare what you import.

## Running scripts

```bash
# Run a script in a specific workspace
npm run build -w @dna-platform/public

# Run a script in all workspaces that have it
npm run build --workspaces

# Run a script in all workspaces, ignore those without it
npm run build --workspaces --if-present
```

## Workspace constraints

- **No nesting:** A workspace cannot contain another workspace. `library/` is a container, not a workspace. `library/public/` and `library/dictionary/` are workspaces.
- **No circular dependencies:** If A depends on B, B cannot depend on A. npm will error.
- **Flat node_modules by default:** Use `--install-strategy=nested` if hoisting causes issues (rare).

## What to verify when using this ability

- [ ] Root `package.json` has `"private": true`
- [ ] All workspace packages use `@dna-platform/` scope
- [ ] Cross-workspace deps use `*` version specifier
- [ ] No workspace is nested inside another workspace
- [ ] Every dependency imported in code is declared in that workspace's `package.json`
- [ ] `npm install` at root succeeds with no errors
- [ ] Workspace globs in root `package.json` cover all intended workspace locations
