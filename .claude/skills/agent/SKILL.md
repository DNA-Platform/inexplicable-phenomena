---
name: agent
description: Create, update, or list agents — named entities with roles assigned to specific parts of the codebase
disable-model-invocation: true
argument-hint: "[name/description or 'list']"
---

Create, update, or list agents. An agent is a named entity with one or more roles, assigned to specific parts of the codebase.

## What an agent is

A role defines a lens. An agent applies that lens to a specific scope.

Why the distinction matters: you might need two agents with the same role watching different parts of the codebase. Or one agent who combines two roles because their scope overlaps. The role defines *how* to think. The agent defines *where* to think and *who* is responsible.

Agents are the unit of assignment in sprints and reviews. When a sprint story has an owner, it's an agent. When a review scans the codebase, it checks which agents are assigned.

## Registry

Agent definitions live in [agents]. Each agent is a markdown file with YAML frontmatter for machine-readable fields and a body for context.

**Frontmatter schema:**

```yaml
---
name: agent-name
roles:
  - role-name-1
  - role-name-2
paths:
  - "src/relay/**"
  - ".claude/skills/**/*.md"
status: active          # active | inactive | retired
created: 2026-03-29
---
```

**Body:** A paragraph explaining what this agent owns, why these paths are grouped together, and what kind of changes should trigger consultation with this agent.

### Registry index

After creating or modifying an agent, update the [agent registry] — a flat lookup optimized for quick path matching:

```json
{
  "agents": [
    {
      "name": "agent-name",
      "roles": ["role-1", "role-2"],
      "paths": ["src/relay/**", ".claude/skills/**/*.md"],
      "status": "active"
    }
  ]
}
```

This file is the one to read when you need to quickly find which agent owns a path. The individual `.md` files have the full context.

## Steps

### Creating an agent

1. **Understand the request.** Read $ARGUMENTS. Doug will describe what the agent should cover — possibly a name, roles, and paths, or just a vague area like "someone to watch the PowerShell scripts."

2. **Check existing state.** Read the [agent registry] (create it if it doesn't exist). Read [roles] to see available roles. Flag any issues:
   - If a requested role doesn't exist, recommend creating it with `/role` first.
   - If the paths overlap with an existing agent, warn Doug and ask how to handle it (merge, split, overlap is fine).

3. **Name the agent.** If Doug didn't provide a name, suggest one. Agent names should be distinct from role names. They can be more descriptive since they represent a specific assignment, not a general capability. But keep them short — they'll appear in sprint tables and review output.

4. **Present the draft.** Show the frontmatter and body. Ask Doug to confirm.

5. **Write the files:**
   - Create [agents]`/{name}.md`
   - Update the [agent registry]

6. **Suggest a review.** If this agent covers paths that already have code, suggest running `/review -path {paths}` so the agent can survey their territory and flag anything.

### Updating an agent

If Doug wants to change an agent's roles, paths, or status:
1. Read the current agent file.
2. Make the changes.
3. Update `registry.json` to match.
4. Show what changed.

### Listing agents

If Doug asks to list agents, or $ARGUMENTS is empty or "list":
1. Read the [agent registry].
2. Display a table:

   ```
   | Agent | Roles | Paths | Status |
   |-------|-------|-------|--------|
   ```

3. Check for gaps: scan the top-level directories in the project and flag any that no agent covers. Suggest assignments if obvious.

### Retiring an agent

Set status to `retired` in both the `.md` file and the [agent registry]. Don't delete — the history is useful context.

## Path conventions

Paths use glob patterns consistent with `.gitignore` style:
- `src/**` — everything under src
- `*.ps1` — all PowerShell scripts at any depth
- `.claude/skills/**/*.md` — skill directory pattern
- `!tests/**` — exclusion (agent does NOT own tests even if parent glob matches)

## Consultation protocol

When any command or workflow modifies files, it should check whether an assigned agent's paths are affected. The check is:

1. Read the [agent registry].
2. For each modified file, match against agent paths.
3. If a match is found and the current work isn't already under that agent's ownership, note it: "This touches {agent}'s territory ({path}). Consider their perspective."

This is advisory, not blocking. The point is awareness, not gatekeeping.

<!-- citations -->
[roles]: .claude/team/roles/
[agents]: .claude/team/agents
[agent registry]: .claude/team/agents/registry.json
[project tracker]: .claude/project/index.md

$ARGUMENTS
