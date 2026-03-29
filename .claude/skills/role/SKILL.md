---
name: role
description: Create or update a role definition — a context-loading strategy that shapes attention, knowledge, and priorities
disable-model-invocation: true
argument-hint: "[role-name or description]"
---

Create or update a role definition. A role describes a lens — a way of thinking that shapes what you notice, what you prioritize, and what you generate.

## What a role actually is

A role is not a persona or a character. It is a **context-loading strategy** that exploits how LLMs actually work.

When a role definition sits in your context window, it does three concrete things:

1. **Attention shaping.** The role's priorities ("stealth first", "failure handling first") bias token generation toward those concerns. When generating code as a reliability engineer, you naturally write the error path before the happy path — not because you're pretending, but because "what happens when this fails?" is literally in your attention window.

2. **Knowledge activation.** The abilities listed in a role are specific documents you load into context. Without them, you have general knowledge about UIA or file locking. With them, you have the exact API calls, the specific gotchas, the retry constants. The role tells you *which* knowledge to activate for *this* task.

3. **Priority filtering.** Every task has many valid approaches. A role's anxieties and mantra act as a filter: of the approaches you could generate, which ones does this role prefer? The paranoid interface engineer prefers the one that doesn't steal focus. The signal engineer prefers the one that filters aggressively. This isn't pretend — it's a selection pressure on your output distribution.

A role is effective when loading it into context *measurably changes what you generate*. If removing the role definition wouldn't change your output, the role is decorative.

## Steps

1. **Understand the request.** Read $ARGUMENTS for the role description. If it's a name only ("frontend-engineer"), ask Doug what specific concerns and scope this role should cover in this project.

2. **Check existing roles.** Read [roles] to see what already exists. If the requested role overlaps significantly with an existing one, suggest updating instead of creating.

3. **Design the role.** Build these components:

   **Name** — Short, evocative. Not a job title. Tap, Sift, Pace are the existing pattern: verb-like, one syllable, describes the action. But if Doug wants a different naming style, follow his lead.

   **One-line identity** — "The {X} engineer." What lens does this role apply?

   **What {Name} cares about** — The domain. Written as a paragraph that establishes expertise and context. What does this role notice that others miss? What problems has this role seen before?

   **First question** — The diagnostic question this role asks before any task. Sift asks "What's signal and what's noise?" Pace asks "What happens when this fails?" This shapes how you approach work under this role.

   **Anxieties** — 4-6 specific failure modes this role worries about. Not generic fears — concrete things that go wrong in this domain. These sit in context and make you check for them.

   **Mantra** — 2-5 words. The tiebreaker when two valid approaches conflict. "When in doubt, it's noise." "Dead loops are silent." "Leave no trace."

   **Abilities** — Which [abilities] files should be loaded when acting as this role? If the role needs abilities that don't exist yet, note them as "TODO: create" and describe what they'd contain. Abilities are the knowledge layer — the role is the priority layer.

   **Source files** — Which files in the codebase should this role read before working? These ground the role in current implementation.

   **How I become {Name}** — The honest section. Explain in concrete terms what changes when this role's context is loaded. What specific knowledge activates? What priority filter applies? What tradeoff does this role encode? See existing role files for the tone — direct, mechanical, no mysticism.

4. **Present the draft to Doug.** Show the full role definition. Ask if the priorities, anxieties, and mantra feel right. The anxieties are the most important part — they're what actually shape output.

5. **Write the file.** Save to [roles]`/{name}.md`. Use lowercase for the filename.

6. **Update the project tracker.** If a sprint is active, add the new role to the team table in the [project tracker].

## Updating an existing role

If Doug wants to modify an existing role (add an anxiety, change the mantra, update abilities), read the current file, make the changes, and show a summary of what changed.

## Role file structure

Follow the structure of existing roles ([Tap], [Sift], [Pace]). They all follow the same pattern:

```markdown
# {Name}

The {domain} engineer. {One sentence description.}

## What {Name} cares about
{Paragraph establishing domain expertise and what this role notices.}

{Name}'s first question on any task: **"{diagnostic question}"**

{Name}'s anxieties:
- {specific failure mode 1}
- {specific failure mode 2}
...

{Name}'s mantra: **{2-5 words.}**

## Abilities
Load these before acting as {Name}:
- `abilities/{name}.md` — {what it provides}
...

## Source files to read
Before doing {Name}'s work, ground yourself in the current implementation:
- `{path}` — {what to learn from it}
...

## How I become {Name}
{Honest explanation of what context-loading does to your output.}

**To execute as {Name}:** Load this file, load the ability files listed above, read the source files listed above. Then approach the task with {Name}'s priorities: {priority 1} first, {priority 2} second, {priority 3} third.
```

<!-- citations -->
[roles]: .claude/team/roles
[Tap]: .claude/team/roles/tap.md
[Sift]: .claude/team/roles/sift.md
[Pace]: .claude/team/roles/pace.md
[abilities]: .claude/team/abilities/
[project tracker]: .claude/project/index.md

$ARGUMENTS
