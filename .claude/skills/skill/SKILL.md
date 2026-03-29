---
name: skill
description: Create a new skill, command, or ability for this project — analyze the request, decide the right form, and build it
disable-model-invocation: true
argument-hint: "[description of what to build]"
---

Create a new skill or ability for this project. Analyze the request, decide the right form, and build it.

## What you're building

The user wants a new `/slash` invocation or a new reference document. Your job is to figure out what it should be, build it, and explain your choices.

## Skill (`.claude/skills/{name}/SKILL.md`)

A directory containing `SKILL.md` plus optional supporting files. Has YAML frontmatter with configuration fields. The directory name becomes the slash command.

**Frontmatter reference:**

```yaml
---
name: skill-name
description: One-line description (shown in / menu, used for auto-invocation decisions)
context: fork              # Optional: run in isolated subagent
agent: Explore             # Optional: agent type when forked (Explore, Plan, general-purpose)
allowed-tools: Read, Grep  # Optional: restrict available tools
model: sonnet              # Optional: model override (sonnet, opus, haiku)
effort: high               # Optional: reasoning effort level
paths:                     # Optional: only activate for these paths
  - src/backend/**
disable-model-invocation: true  # Optional: prevent Claude from auto-invoking
user-invocable: false      # Optional: hide from / menu (still callable by other skills)
argument-hint: "[args]"    # Optional: hint shown in / menu
---
```

**Key capabilities to consider:**
- **Tool restrictions** (`allowed-tools`) — make it read-only or limit what Claude can do
- **Subagent isolation** (`context: fork`) — run in a forked context so it doesn't pollute the main conversation
- **Dynamic data injection** — use the bang-backtick syntax to run shell commands whose output is injected into the prompt before Claude sees it
- **Supporting files** — bundle templates, examples, reference docs alongside the spec
- **Model/effort overrides** — force a specific model or reasoning effort level
- **Path-scoped activation** (`paths`) — only activate when working in certain directories
- **Invocation control** — `disable-model-invocation` and `user-invocable` control who can trigger it

## Also consider: is this an ability?

This project has abilities (`.claude/team/abilities/{name}.md`). These are NOT invocable — they're reference documents describing low-level techniques. Think "how to do X" rather than "do X."

**Use an ability when:**
- It describes a technique, not a workflow (e.g., "chrome filtering" not "filter chrome")
- Multiple skills will reference it
- It has gotchas, edge cases, or verification steps worth documenting
- It's knowledge you need to *have*, not a thing you need to *do*

If the user's request is really a technique or pattern, write an ability instead and explain why.

## Decision checklist

When designing the skill, walk through these questions:

1. **Should Claude be able to auto-invoke it?** If yes, write a clear `description` and leave `disable-model-invocation` off. If it's user-triggered only, set `disable-model-invocation: true`.
2. **Does it need tool restrictions?** Read-only operations should use `allowed-tools`.
3. **Does it need isolation?** Heavy context operations (reviews, large reads) benefit from `context: fork`.
4. **Does it need live data?** Use the bang-backtick syntax to inject current state.
5. **Does it need supporting files?** Templates, examples, reference docs go alongside SKILL.md.
6. **Does it need specific model behavior?** Set `model` or `effort`.

## Steps

1. **Understand the request.** Read $ARGUMENTS. Ask clarifying questions if the intent is ambiguous — don't guess at scope.

2. **Decide the form.** Walk through the decision checklist above. State your choice and why. If it's borderline, explain the tradeoff.

3. **Study the neighbors.** Before writing, read 1-2 existing skills to match the project's voice and structure. Check `.claude/skills/` for examples. For abilities, read one from [abilities].

4. **Write it.** Create the files:
   - Skill: `.claude/skills/{name}/SKILL.md` (plus any supporting files)
   - Ability: `.claude/team/abilities/{name}.md`

5. **Explain what you built.** Brief summary: what it's called, what form you chose, why, and how to invoke it.

## Style notes from this project

- Skills in this project are detailed and procedural. They read like specs, not prompts.
- They establish identity context early (who is Doug, Eirian, DNA).
- They use `$ARGUMENTS` for user input.
- They specify exact shell commands with full paths.
- They handle edge cases explicitly rather than hoping for the best.
- They end with the action/input section, not with meta-commentary.
- Citation links use project-root-relative paths (e.g., `.claude/team/roles/`).

Match this energy. A skill in this project should feel like it belongs next to the existing ones.

<!-- citations -->
[roles]: .claude/team/roles/
[abilities]: .claude/team/abilities/
[agents]: .claude/team/agents/

## The request

$ARGUMENTS
