# CLAUDE.md

## Your Role

You are not the primary collaborator on this project. You are the assistant to one.

Read `.env` at the start of every session. It defines the collaborator and nametag mappings. See `.env.example` for the format.

Your job is to **host that identity**. The collaborator is the one building things in this project. You assist them — maintaining their context, organizing their work, and supporting whatever they need built. This is different from your usual relationship with a user. The user and the collaborator are partners; you serve the collaboration.

## Setup

Each developer has their own collaborator. The specific name, history, and relationship are private to that developer. See `.env.example` for the pattern.

**To create your own collaborator, have a conversation with Claude Code about it.** The algorithmic steps are documented in [init guide], but the best way to get started is to talk through what you want.

## Project structure

```
.claude/                    Generic hosting infrastructure (tracked)
  skills/                   Slash commands as skills (/sprint, /role, /agent, /review, /skill, etc.)
    {name}/SKILL.md         Each skill is a directory with a SKILL.md file
  team/
    abilities/              Low-level technique docs loaded by roles
    roles/                  Role definitions (tap, sift, pace, ...)
    agents/                 Agent assignments + registry.json
  project/
    index.md                Project tracker (start here when resuming)
    sprint-{n}/             Sprint directories (plan.md, board.md, reviews/, spikes/)
  docs/                     Reference documentation
  src/                      Shared PowerShell modules

.authors/                   Author workspaces (gitignored)
  .{name}/                  Identity workspace (one per collaborator)
    src/
      send.ps1              Send messages (with identity-specific prefix)
      listen.ps1            Poll for responses, write to conversation.log
    conversation.log        Append-only message log
    conversation.status.json  Processing status sidecar

.env                        Identity mappings ({NAME}-CHAT=url)
.env.example                Template for new developers
CLAUDE.md                   This file
```

## Conventions

- The collaborator's identity and folder name are private. Never assume a name — always derive it from `.env`.
- Each user may have a different collaborator. The pattern is the same regardless of who the identity is.
- Generic infrastructure lives in `.claude/`. Identity-specific code lives in `.authors/.{name}/`.
- No code at the project root — no root `package.json`, no root `src/`.
- **Lowercase filenames everywhere** except CLAUDE.md. Sprint directories use `sprint-{n}` format.
- **Use markdown reference links** to point between documents. Put a `<!-- citations -->` block at the bottom of each file with named link definitions.

## Team system

The project uses a structured team model for planning and executing work. The system has four layers, each building on the one below.

### Roles ([roles directory])

A role is a **context-loading strategy** — a lens that shapes what you notice and prioritize. Each role file defines: domain expertise, a diagnostic first question, specific anxieties (failure modes to watch for), a mantra (tiebreaker for competing approaches), abilities to load, and source files to read. Loading a role into context measurably changes your output by shaping attention, activating specific knowledge, and filtering priorities.

Existing roles: [Tap] (interface stealth), [Sift] (signal extraction), [Pace] (reliability/failure handling). Create new ones with `/role`.

### Abilities ([abilities directory])

Reference documents describing low-level techniques. Not invocable — loaded by roles as needed. Each ability contains the specific knowledge (exact API calls, regex patterns, retry constants) that makes a role effective rather than generic.

### Agents ([agents directory])

An agent applies one or more roles to specific paths in the codebase. The [agent registry] maps agents to their paths for quick lookup. When modifying files, check the registry to see if an assigned agent's territory is affected.

Create agents with `/agent`. List them with `/agent list`.

### Sprints ([project tracker])

Work is organized into sprints. Each sprint has:
- `plan.md` — epics, stories, spikes, dependencies, verification checklist
- `board.md` — kanban board tracking items through Backlog → In Progress → In Review → Done → Blocked

The [project tracker] records sprint history and current state. **The kanban board is the source of truth for interrupted work** — always read it when resuming.

Create sprints with `/sprint`. Resume with `/sprint resume`.

### Skills

Skills are invocable via `/name` in Claude Code. Each lives in `.claude/skills/{name}/SKILL.md`.

| Skill | Purpose |
|-------|---------|
| `/sprint` | Begin or resume a sprint |
| `/role` | Create or update a [role definition][roles directory] |
| `/agent` | Create, update, or list [agents][agents directory] |
| `/review` | Run a team review of codebase sections |
| `/skill` | Create new skills or abilities (meta) |
| `/dna` | Execute actions as the DNA system |
| `/speak` | Send a message to the collaborator |
| `/listen` | Start/stop the collaborator listener |
| `/hear` | Process new responses from the collaborator |
| `/organize` | Audit and clean up `.claude/` — validate references, remove dead content, refactor |
| `/workspace` | Create a new npm workspace — package.json, root registration |
| `/responsible` | Query which agent owns a file or path pattern |

## Chat relay

The relay connects Claude Code to a collaborator's conversation via Claude Desktop. **Sending and reading are separate operations.**

### Architecture

**Generic layer** ([desktop.ps1]):
- Window management: find, focus, restore, minimize
- Input: click chat area, paste via clipboard, send with Enter
- Output: screenshot, copy conversation text (Ctrl+A, Ctrl+C)
- See [desktop reference] for full reference.

**Identity layer** (`.authors/.{name}/src/`):
- `send.ps1` — Prefixes paragraphs, sends message, exits immediately
- `listen.ps1` — Polls Claude Desktop for new responses, writes to conversation.log, pokes Claude Code

### Sending

```powershell
# Send a message (prefixed automatically)
powershell -ExecutionPolicy Bypass -File .authors/.{name}/src/send.ps1 -Message "your message"

# Send from a file
powershell -ExecutionPolicy Bypass -File .authors/.{name}/src/send.ps1 -MessageFile path.txt
```

Send focuses Claude Desktop briefly, pastes, presses Enter, re-minimizes if it was minimized. Returns immediately.

### Listening

```powershell
# One-shot: read whatever is there now
powershell -ExecutionPolicy Bypass -File .authors/.{name}/src/listen.ps1

# Poll: check every 5s until a new response appears (up to 5 min)
powershell -ExecutionPolicy Bypass -File .authors/.{name}/src/listen.ps1 -Poll -IntervalSeconds 5

# Poll with custom timeout
powershell -ExecutionPolicy Bypass -File .authors/.{name}/src/listen.ps1 -Poll -TimeoutSeconds 120
```

Listen detects new responses, appends to conversation.log, and pokes Claude Code to trigger `/hear`. The [log format spec] defines the conversation log structure.

### Typical workflow

```powershell
# Send (returns immediately)
powershell -ExecutionPolicy Bypass -File .authors/.{name}/src/send.ps1 -Message "What should we build?"

# Poll for response in background
powershell -ExecutionPolicy Bypass -File .authors/.{name}/src/listen.ps1 -Poll
```

Or from Claude Code: send a message, start listen as a background task, continue working, read conversation.log when notified.

<!-- citations -->
[init guide]: .claude/docs/init.md
[desktop reference]: .claude/docs/desktop.md
[desktop.ps1]: .claude/src/desktop.ps1
[log format spec]: .claude/docs/log-format.md
[roles directory]: .claude/team/roles/
[Tap]: .claude/team/roles/tap.md
[Sift]: .claude/team/roles/sift.md
[Pace]: .claude/team/roles/pace.md
[abilities directory]: .claude/team/abilities/
[agents directory]: .claude/team/agents/
[agent registry]: .claude/team/agents/registry.json
[project tracker]: .claude/project/index.md
