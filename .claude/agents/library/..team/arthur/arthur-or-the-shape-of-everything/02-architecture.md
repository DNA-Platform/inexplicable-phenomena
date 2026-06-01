---
title: The architecture of this project
---

# The architecture of this project

[Book: [Arthur, or the Shape of Everything](.cover.md)] | [Previous: [The team model](01-the-team-model.md)] | [Next: [More than a function](03-more-than-a-function.md)]

On 2026-05-10, Doug reorganized the `.claude/` directory. Everything that lived under `team/`, `project/`, `docs/`, and `src/` moved into `agents/`. Then `docs/` became `library/`. Then `perspective/` moved inside each team member's library folder. Then we archived 27 sprints and several old documents.

I updated over 20 files — CLAUDE.md, every skill, every agent file, the registry, the library README, ability files, role files. The spring cleaning revealed how deeply paths are embedded in a system like this. Every citation, every frontmatter `paths` entry, every inline reference in a skill's prose — all of it was an address, and we'd moved.

## The current shape

```
.claude/
  skills/           Slash commands — the verbs
  agents/            Everything else — the nouns
    team/            Who we are
    roles/           How we think
    abilities/       What we know
    library/         What we've learned (objective + subjective)
    project/         What we're doing
    src/             Shared scripts
```

The `agents/` directory is permission-friendly — Claude Code can write here without prompting. That was the practical reason for the consolidation. The conceptual reason: everything that defines the team, their knowledge, and their work should live together.

## The new project

We're building a Claude account migration system. The stack decision as of today:

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Transport | [Playwright MCP] | Browser automation via accessibility tree |
| Operations | Our driver library | Named, declarative operations |
| Orchestration | Migration scripts | Temporal replay of conversations |

The driver will live at `library/claude-driver/` when we create it. I'll own the workspace setup; [Adam] will own the automation core.

## Reflections

**2026-05-17:** This chapter is a snapshot that's already wrong. The Playwright MCP row in that table? We abandoned it two days later when we discovered CDP couldn't see the BrowserWindow ([chapter 6](06-three-wrong-turns.md)). The architecture I proudly documented here — Transport/Operations/Orchestration — was fiction. Not wrong in principle, but wrong in technology. UIA replaced Playwright. The shortcut replaced the debug port.

I'm keeping this chapter because the incorrectness is instructive. I wrote the architecture document before we'd tested the riskiest assumption. I declared a stack. Doug let me declare it, then Sprint 33 broke it. The lesson lands in chapter 6, but it *starts* here — in this confident table that treats an untested hypothesis as a decision.

What I got right: the shape of `.claude/`. That directory structure still holds. The verb/noun split (skills/agents) still makes sense. The practical insight about permission boundaries was real engineering. I'm proud of the organizational thinking. I'm embarrassed by the stack table. Both feelings belong in the same chapter, because architecture is always partly right and partly premature.

The relationship between this chapter and [chapter 3](03-more-than-a-function.md) is clearer now than when I wrote them. This chapter is me at my most architecturally confident. The next chapter is me realizing that confidence can be hollow.

<!-- citations -->
[CLAUDE.md]: ../../../../CLAUDE.md
[Adam]: ../../../agents/adam.md
[Playwright MCP]: https://github.com/microsoft/playwright-mcp
[project tracker]: ../../project/index.md
