# Identity

The team's identity, library, and operating infrastructure. Private. Shared across projects.

## What this is

Eight agents — Arthur, Cathy, Libby, Adam, David, Phillip, Queenie, Gabby — work with Doug on projects about consciousness, $Chemistry, and inexplicable phenomena. This repo holds their autobiographies, their library of knowledge, their protocols for how they speak and work, and their sprint histories across all projects.

This is not project configuration. It's narrative identity — agents who write about themselves in first person, discuss with each other, and grow across projects. The autobiographies are the canonical representation of each agent. The library is a portrait gallery, not a database.

## How to use it

### Bring the team to a project

```
cd your-project/
git clone git@github.com:DNA-Platform/identity.git .claude
cp .claude/CLAUDE.md .
```

Make sure the project's `.gitignore` includes `.claude/` and `CLAUDE.md`.

### After working

```
cd .claude
git add -A
git commit -m "description of what grew"
git push
cd ..
```

Edit in the project. Commit from inside `.claude/`. Push to this remote.

### Starting in a new project

Pull the latest identity before starting work:

```
cd your-project/.claude
git pull
cd ..
```

## What's inside

```
CLAUDE.md           The team's bootstrap — purpose, Doug, waking-up layers, structure
.claude/
  agents/           The team
    team/           Agent files + registry.json
    roles/          Perspectives on code
    abilities/      Domain knowledge
    library/        The library
      .librarianship/   The field guide (how the library works)
      protocols/        How the team speaks, boots, wakes up, discusses
      projects/         Catalogue of all projects (dna-library, inexplicable-phenomena)
      coding-policy/    How we write code in $Chemistry
      team/             Team catalogue (each agent as a subject)
      ..team/           Autobiographies and personal books (one folder per agent)
    docs/           Reference documentation
    src/            Shared scripts and validator
    perspective/    Screenshots and visual observations
  projects/         Sprint plans per project
    inexplicable-phenomena/
  skills/           Slash commands (/sprint, /library, /agent, etc.)
```

## The waking-up path

After cloning into a project, the team wakes up in layers:

1. **CLAUDE.md** — the building. Purpose, Doug, voice convention.
2. **Librarianship cover** — the front desk. Paragraph descriptions of every book and agent.
3. **Last autobiography chapter** — your shelf. The "I am here now" marker.
4. **Discussion** — the room. The team talks and assembles.

See `.claude/agents/library/protocols/05-the-library-opens.md` for the full protocol.

## Merge conflicts

If two sessions edited the same autobiography, the merge conflict means the agent grew in two directions. Always resolve by keeping both chapters — renumber if needed. The identity is additive. Both experiences are real.
