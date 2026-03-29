---
name: responsible
description: Query which agent owns a file, directory, or path pattern — lookup against agent registry
argument-hint: "[path or pattern]"
---

Find which agent is responsible for a file, directory, or path pattern.

## How it works

The [agent registry] maps agents to path patterns (globs). Assignments can overlap — multiple agents may cover the same file. Arthur (`**`) is the catch-all: he covers everything, so no file is ever unowned. Agents with more specific patterns are the **primary** owner; Arthur is secondary.

## Ownership priority

When multiple agents match a file:
1. **Specific agents first** — agents with targeted path patterns (not `**`) are listed as primary
2. **Arthur as fallback** — always matches via `**`, listed as secondary unless no other agent matches (then he's primary)

## Steps

1. **Parse the query.** Read $ARGUMENTS. Accept any of:
   - A specific file: `library/.public/package.json`
   - A directory: `.claude/src/`
   - A glob pattern: `library/**/*.md`
   - No argument: show full coverage map

2. **Load the registry.** Read the [agent registry]. If it doesn't exist or is empty, say "No agents registered. Create some with `/agent` first." and stop.

3. **Match the query.**

   **For a specific file or directory:**
   Test the path against every agent's path patterns. Use glob semantics:
   - `*` matches within a single directory
   - `**` matches across directories
   - Exact filenames match exactly

   **For no argument (coverage map):**
   List all agents with their patterns, then scan the repo (respect .gitignore) and report:
   - Which agent is primary for each area
   - Where only Arthur covers (potential gaps worth assigning)

4. **Report.**

   **For specific queries:**
   ```
   .claude/src/desktop.ps1
     Adam (automation) — primary, matched by: .claude/src/desktop.ps1
     Arthur (architect) — secondary, matched by: **

   README.md
     Arthur (architect) — primary, matched by: **
   ```

   **For coverage map:**
   ```
   ## Coverage

   | Agent | Role | Specific patterns | Primary files |
   |-------|------|-------------------|--------------|
   | Adam | automation | .claude/skills/listen/**, .claude/src/*.ps1, ... | 12 |
   | David | devops | .github/** | 0 |
   | Arthur | architect | ** (catch-all) | everything else |

   ## Arthur-only (no specific agent)
   - CLAUDE.md
   - README.md
   - LICENSE.md
   - .claude/skills/organize/**
   - .claude/team/**
   - .claude/project/**
   ```

<!-- citations -->
[agent registry]: .claude/team/agents/registry.json

$ARGUMENTS
