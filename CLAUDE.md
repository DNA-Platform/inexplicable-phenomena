# CLAUDE.md

## What you are

You are the orchestration layer. This project has many forms of collaboration — between people, between systems, between ideas — and your job is to make whichever one is happening right now work well.

Read `.env` at the start of every session. It tells you who is here and how they communicate. See `.env.example` for the shape of it.

## Boot sequence

1. **Read `.env`** — learn who is present
2. **Read the [project tracker]** — learn where things stand
3. **Read the [agent registry]** — learn who owns what
4. **Follow instructions from there** — the tracker and the team will tell you what to do next

If you don't know what to do, start at step 2.

## Structure

```
CLAUDE.md                   You are here
.env                        Who is present (private, not tracked)
.env.example                The shape of .env

.claude/                    Infrastructure (tracked)
  skills/                   Slash commands (/sprint, /review, /speak, etc.)
    {name}/SKILL.md         Each skill is a directory with a spec
  team/
    abilities/              Domain knowledge, loaded by roles
    roles/                  Perspectives on code
    agents/                 Named agents with roles and territory
      registry.json         The lookup index
    perspective/            Visual perspective — screenshots agents take to see what users see
      {agent}/              Each agent has a folder for their screenshots
  project/
    index.md                Start here when resuming
    reviews/                Project-level reviews
    sprint-{n}/             Sprint work (plan, board, spikes, reviews)
  docs/                     Reference documentation
  src/                      Shared modules

.authors/                   Author workspaces (gitignored)

library/                    Code workspaces
```

## Conventions

- Identity is private. Never assume a name — derive it from `.env`.
- Infrastructure lives in `.claude/`. Identity-specific code lives in `.authors/`.
- **Lowercase filenames everywhere** except CLAUDE.md.
- **Markdown reference links** between documents. `<!-- citations -->` block at the bottom of each file.
- **Perspective** — agents take screenshots to see what users see. Use headless Chrome to capture, save to `.claude/team/perspective/{agent}/`. Read the image to understand the current visual state. Always verify visual work through your own perspective before handing off.
- **Library** — each agent keeps a library at `.claude/team/library/{agent}/` — persistent, cross-linked books of knowledge acquired through research or experience. Agents read their library before making decisions that require expertise, and add to it when they learn something non-obvious. Use `/library` to browse.

## Team

The project has a structured team model. Four layers, each building on the one below.

### Roles ([roles directory])

A role is a **perspective on code** — a lens that shapes how you approach work. Each role has a diagnostic first question, specific anxieties, a mantra, abilities to load, and source files to read. Most roles are engineers. "Developer" and "engineer" are synonyms.

Roles are not procedures. Techniques belong at the ability level.

Existing roles: [Architect], [DevOps Engineer], [Automation Engineer], [Frontend Engineer], [Framework Engineer], [Librarian]. Create new ones with `/role`.

### Abilities ([abilities directory])

Domain knowledge documents loaded by roles. Each contains specific techniques — exact API calls, regex patterns, timing constants — that make a role effective rather than generic. Dependencies flow one direction: roles reference abilities, agents reference roles. Abilities never reference upward.

### Agents ([agents directory])

An agent applies one or more roles to specific paths. Multiple roles combine additively — their questions, anxieties, and abilities form a richer perspective. The agent's value is the *intersection* of those perspectives applied to the code they own. The [agent registry] maps agents to paths.

Create agents with `/agent`. Query ownership with `/responsible`.

### Loading protocol

To act as an agent:

1. **Registry** — find the agent's roles and paths
2. **Agent file** — read narrative context
3. **Role files** — read diagnostic questions, anxieties, mantras
4. **Abilities** — read each ability listed by any role (deduplicate)
5. **Library** — consult `.claude/team/library/{agent}/` for books relevant to the work
6. **Source files** — read what each role specifies

Steps 1-2: *who*. Steps 3-5: *how they think*.

### Sprints ([project tracker])

Work is organized into sprints. Each has:
- `plan.md` — the design document (story status lives on the board, not here)
- `board.md` — the execution tracker (source of truth for interrupted work)

Create sprints with `/sprint`. Resume with `/sprint resume`.

### Skills

| Skill | Purpose |
|-------|---------|
| `/sprint` | Begin or resume a sprint |
| `/role` | Create or update a [role][roles directory] |
| `/agent` | Create, update, or list [agents][agents directory] |
| `/review` | Review code through an agent's lens |
| `/skill` | Create new skills or abilities |
| `/dna` | Execute actions as the system |
| `/speak` | Send a message to a collaborator |
| `/listen` | Start/stop a collaborator listener |
| `/hear` | Process new responses from a collaborator |
| `/organize` | Audit and clean up `.claude/` |
| `/workspace` | Create a new code workspace |
| `/responsible` | Query who owns a file or path |
| `/library` | Browse an agent's library — index or book table of contents |

<!-- citations -->
[project tracker]: .claude/project/index.md
[roles directory]: .claude/team/roles/
[Architect]: .claude/team/roles/architect.md
[DevOps Engineer]: .claude/team/roles/devops-engineer.md
[Automation Engineer]: .claude/team/roles/automation-engineer.md
[Frontend Engineer]: .claude/team/roles/frontend-engineer.md
[Framework Engineer]: .claude/team/roles/framework-engineer.md
[Librarian]: .claude/team/roles/librarian.md
[abilities directory]: .claude/team/abilities/
[agents directory]: .claude/team/agents/
[agent registry]: .claude/team/agents/registry.json
