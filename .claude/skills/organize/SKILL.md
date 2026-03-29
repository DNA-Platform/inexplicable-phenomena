---
name: organize
description: Audit and clean up the codebase — each agent audits their territory, Arthur handles global structure and unassigned areas
disable-model-invocation: true
argument-hint: "[-scope agent:name|global|all] [-dry-run]"
---

Audit the codebase for structural health. Each agent audits their own territory. Arthur (Architect) handles global structure, cross-cutting concerns, and anything no agent owns.

## What organize means

Organization is not formatting. It's structural integrity — checked through the lens of whoever is responsible for each part of the codebase.

Six concerns, distributed across agents:

1. **Reference validity** — links point to things that exist (Arthur: global, each agent: their files)
2. **Content consistency** — files match the system they belong to (each agent: their territory)
3. **Liveness** — no dead or stale content (each agent: their territory)
4. **Representation fitness** — content is in the right form (each agent: their territory)
5. **Permission hygiene** — settings.local.json matches what skills actually need (Arthur: global)
6. **Structural clarity** — the directory tree and cross-references tell a coherent story (Arthur: global)

## Steps

1. **Parse scope.** Read $ARGUMENTS for flags:
   - `-scope agent:{name}` — only that agent audits their territory
   - `-scope global` — only Arthur's global audit
   - `-scope all` — full audit, all agents + global (default)
   - `-dry-run` — report findings but don't change anything
   - No arguments — full audit, apply fixes

2. **Load the registry.** Read the [agent registry]. Build the agent map: for each agent, collect their name, roles, and path patterns.

3. **Determine territory.** Agents can overlap. Arthur's `**` pattern means every file has at least one owner. For each file, the **primary** owner is the agent with the most specific pattern match. Arthur is secondary (fallback) unless no other agent matches — then he's primary.

4. **Run agent audits.** For each agent in scope, audit their territory through their role's lens:

   ### Arthur (Architect) — global structure + everything not owned by a specific agent

   Arthur always runs. He audits global structure plus any file where he's the only owner (no specific agent assigned). His audit covers:

   a. **CLAUDE.md references.** Extract every reference link. Check each target exists on disk. Flag broken links with line numbers.

   b. **Skill table completeness.** Every directory in `.claude/skills/` should have a row in the CLAUDE.md skill table. Flag missing entries.

   c. **Skill consistency.** For each skill:
      - Verify frontmatter has `name` and `description`
      - Check supporting file references resolve
      - Flag skills over 150 lines (overgrown — consider extracting)

   d. **Agent registry health.** For each agent:
      - Verify the `.md` file exists
      - Verify path patterns match at least one existing file
      - Verify referenced roles exist in `.claude/team/roles/`
      - Flag orphaned `.md` files not in registry

   e. **Workspace consistency.** For each workspace in root `package.json`:
      - Verify the directory exists and contains `package.json`
      - Verify package names use `@dna-platform/` scope
      - Check workspace globs resolve correctly

   f. **Permission hygiene.** Read `.claude/settings.local.json`:
      - Grep all skills for shell commands (powershell, git, npm, mkdir in code blocks/backticks)
      - Flag `Bash(...)` patterns that match no skill command (stale)
      - Flag skill commands with no matching pattern (missing permission)
      - Flag overly broad patterns

   g. **Arthur-only files.** List files where Arthur is the only owner (no specific agent). These aren't gaps — Arthur owns them — but significant clusters may warrant assigning a specific agent. Audit these files: check they're referenced, non-stale, and in the right place.

   ### Adam (Automation) — relay territory

   Adam audits files matching his path patterns through the Automation lens:

   a. **Skill health.** For /listen, /hear, /speak: verify paths in the skill match actual files on disk (e.g., `.authors/.eirian/src/send.ps1` exists).

   b. **Script-skill alignment.** Commands in skills should match what the scripts actually accept (flags, parameters).

   c. **Doc currency.** Check `.claude/docs/log-format.md` and `.claude/docs/desktop.md` describe current behavior.

   d. **Cross-reference integrity.** Skills reference source files, docs reference functions — verify the chain is unbroken.

   ### David (DevOps) — CI/CD territory

   David audits files matching his path patterns through the DevOps lens:

   a. **Workflow validity.** If `.github/` exists, check workflows reference existing scripts and valid actions.

   b. **Script health.** Verify scripts have consistent conventions (error handling, exit codes).

   ### Any other agent

   For agents not explicitly listed above, apply a generic audit through their role's lens:
   - Load the agent's role file
   - Read the role's anxieties — each anxiety becomes a check
   - Audit the agent's path-matched files against those anxieties
   - Check references, liveness, and consistency within the agent's territory

5. **Audit roles and abilities** (Arthur — these are global structure):

   a. **Roles.** For each file in `.claude/team/roles/`:
      - Check required sections: domain paragraph, diagnostic question, anxieties, mantra, abilities list, source files list
      - Verify referenced abilities exist in `.claude/team/abilities/`
      - Verify referenced source files exist on disk
      - Check if the role is used by at least one agent

   b. **Abilities.** For each file in `.claude/team/abilities/`:
      - Check it's loaded by at least one role
      - Flag orphaned abilities no role references

6. **Compile findings.** Group by agent, then by category:

   ```
   ## Arthur (global + arthur-only)

   ### Broken references
   - CLAUDE.md:42 — [init guide] points to .claude/docs/init.md (missing)

   ### Stale permissions
   - Bash(mkdir *) — no skill uses mkdir

   ### Arthur-only clusters
   - .claude/team/** — significant area, consider specific agent
   - README.md, LICENSE.md — root docs, fine as Arthur-only

   ## Adam (automation)

   ### Consistency issues
   - /speak references .authors/.eirian/src/send.ps1 — file exists, OK
   - /hear references .authors/.eirian/heartbeat — created at runtime, OK
   ```

7. **Apply fixes** (unless `-dry-run`):
   - Each agent's fixes stay within their territory
   - Arthur handles global fixes (CLAUDE.md links, permissions, registry)
   - Broken references: update or remove
   - Dead content: delete
   - Consistency issues: fix frontmatter, update descriptions
   - Representation issues and structural suggestions: describe and ask before applying

8. **Report.** Summarize per agent:
   - What each agent found and fixed in their territory
   - What Arthur found and fixed globally
   - Deferred recommendations needing Doug's approval

## What NOT to touch

- `.authors/` identity directories — private, outside organize's scope (except path existence checks)
- `.env` and `.env.example` — identity config
- Git history — organize is about current file structure
- Content quality — organize checks structure and references, not whether instructions are well-written

<!-- citations -->
[agent registry]: .claude/team/agents/registry.json
[agents]: .claude/team/agents/
[roles]: .claude/team/roles/
[abilities]: .claude/team/abilities/
[project tracker]: .claude/project/index.md

## The request

$ARGUMENTS
