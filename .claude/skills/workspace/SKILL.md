---
name: workspace
description: Create a new npm workspace — initialize package.json, register in root config, set up directory structure
disable-model-invocation: true
argument-hint: "[path] [description]"
---

Create a new npm workspace. This skill is owned by Arthur (Architect).

## What a workspace is

A workspace is a self-contained npm package within the monorepo. It has:
- A `package.json` with a scoped name (`@dna-platform/*`), version, and description
- A clear boundary — it can depend on other workspaces, but no workspace nests inside another
- A place in the root `package.json`'s `workspaces` array (via glob pattern)

## Steps

1. **Parse the request.** Read $ARGUMENTS for:
   - **Path** — where the workspace lives (e.g., `library/dictionary`, `.claude`)
   - **Description** — what it does (optional, can ask)
   - If neither is clear, ask Doug: "Where should this workspace live, and what does it do?"

2. **Validate the location.**
   a. Check that the path doesn't already have a `package.json` (if it does, it's already a workspace — offer to update instead).
   b. Check that the path is not inside an existing workspace. Read the root `package.json` workspaces globs, resolve them, and verify no existing workspace is an ancestor of the new path.
   c. Check that no existing workspace is a descendant of the new path (no nesting in either direction).

3. **Derive the package name.** Convention: `@dna-platform/{name}` where `{name}` is the last path segment, lowercased, hyphenated. Examples:
   - `library/dictionary` → `@dna-platform/dictionary`
   - `library/public` → `@dna-platform/public`
   - `.claude` → `@dna-platform/claude`

   If the name would collide with an existing workspace, ask Doug for an alternative.

4. **Check root workspace globs.** Read the root `package.json`. Verify that the workspace path would be matched by an existing glob in the `workspaces` array. If not, add a new glob pattern. Prefer broad patterns (`library/*`) over specific paths.

5. **Create the package.json.** Write to `{path}/package.json`:

   ```json
   {
     "name": "@dna-platform/{name}",
     "version": "0.0.1",
     "private": true,
     "description": "{description}"
   }
   ```

   Start private. Publishing configuration comes later when the workspace is ready.

6. **Check for dependencies.** If the workspace will obviously depend on siblings (e.g., `.public` depending on other library workspaces), ask Doug which dependencies to add now vs. later.

7. **Verify.** Run `npm install` at root to confirm the workspace resolves correctly. Check for errors.

8. **Report.** Tell Doug:
   - What was created and where
   - The package name
   - Whether root `package.json` was modified
   - Suggest next steps (add code, declare dependencies, etc.)

## Updating an existing workspace

If the path already has a `package.json`, offer to:
- Add dependencies (`npm install <pkg> -w @dna-platform/{name}`)
- Update description, version, or scripts
- Add `publishConfig` for GitHub Packages if ready to publish
- Add cross-workspace dependencies

## What NOT to do

- Don't create nested workspaces
- Don't add code — this skill only sets up the workspace shell
- Don't publish — that's a separate decision
- Don't modify other workspaces' package.json files (unless adding a cross-dep that was requested)

<!-- citations -->
[agent registry]: .claude/team/agents/registry.json

$ARGUMENTS
