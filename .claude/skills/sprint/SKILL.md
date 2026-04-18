---
name: sprint
description: Begin or resume a sprint — name it, define its purpose, assemble the team, build the board
disable-model-invocation: true
argument-hint: "[purpose or 'resume']"
---

Begin a new sprint. Name it, define its purpose, assemble the team, build the board.

## Naming convention

Sprints follow the pattern `sprint-{n}` where `{n}` is the next sequential number. The sprint's name goes inside the plan, not in the directory name. Examples: `sprint-1`, `sprint-2`.

## Steps

1. **Read current state.** Load the [project tracker] to find the current sprint number and status. The next sprint is `sprint-{current + 1}`.

2. **Read the team.** List all files in [roles] and [agents]. Read the [agent registry]. Summarize the current team for Doug.

3. **Get the purpose.** If `$ARGUMENTS` contains a description of the sprint's purpose, use it. Otherwise, ask Doug: "What's this sprint for?" Wait for his answer before proceeding.

4. **Ask questions and make recommendations.** This is a planning conversation, not a checklist. Before building anything, discuss the sprint with Doug:

   **Questions to ask** (pick the ones that matter for this sprint, 2-5 typical):
   - Scope questions ("Does this include X or is that out of scope?")
   - Constraint questions ("Are there parts of the codebase we shouldn't touch?")
   - Priority questions ("What's the most important outcome?")
   - Risk questions ("What's the scariest part of this?")
   - Dependency questions ("Does this block or get blocked by anything external?")

   **Recommendations to make** (always consider these, mention the ones that apply):
   - **New roles:** "This sprint involves {domain} work. We don't have a role for that. I'd recommend creating a {name} role with `/role` — it would give us {specific capability}."
   - **New agents:** "No agent covers {path}. We should create one to own that territory."
   - **New abilities:** "The team will need to {technique} repeatedly. I'd recommend documenting that as an ability in [abilities] so the knowledge is reusable."
   - **Spikes:** "I'm not sure about {uncertain thing}. We should spike it before committing to an approach."

   Wait for Doug's responses before proceeding. This is a dialogue, not a monologue.

5. **Assemble the team.** Based on the sprint purpose and Doug's answers:

   a. Identify which roles are needed. Check [roles] for existing roles. If a role is needed but doesn't exist, offer to create it with `/role`.

   b. Identify which agents should be on the team. Check [agents] for existing agents whose paths overlap with the sprint's scope. If no agent covers a needed area, offer to create one with `/agent`.

   c. Present the proposed team to Doug:
      ```
      ## Proposed team for sprint-{n}

      | Agent | Roles | Scope in this sprint |
      |-------|-------|---------------------|
      | {name} | {roles} | {what they'll focus on} |
      ```

   d. Ask if he wants to add, remove, or modify any assignments.

6. **Create the sprint directory and board.** Once Doug approves the team:

   ```
   .claude/project/sprint-{n}/
     plan.md        — Sprint plan (see format below)
     board.md       — Kanban board (see format below)
     reviews/       — For team reviews
     spikes/        — For exploratory work
   ```

7. **Write plan.md.** See "Sprint plan format" below.

8. **Write board.md.** See "Kanban board format" below. Initialize all items in the Backlog column.

9. **Update the project tracker.** Update the [project tracker]:
   - Set `Current sprint` to the new sprint
   - Add the new sprint to the history table with status `In Progress`
   - Update the team table if new agents/roles were created

10. **Confirm.** Tell Doug the sprint is ready, where to find the plan and board, and what the first move should be.

---

## Sprint plan format

```markdown
# Sprint {n}: {name}

{One paragraph: what we're building and why.}

## Status: IN PROGRESS

Last updated: {date}

## Team

| Agent | Roles | Scope |
|-------|-------|-------|
| {name} | {roles} | {what they own in this sprint} |

## Spikes

Spikes run first. They answer questions that shape implementation. Each spike has a clear question and a decision gate: what do we do with the answer?

### SP-{n}: {title} — {status}
- **Owner:** {agent}
- **Question:** {what we need to learn}
- **Method:** {how to find out}
- **Decision gate:** {what the answer determines — e.g., "If X, we do A. If Y, we do B."}
- **Output:** `spikes/{filename}.md`
- **Finding:** {filled in when complete}

## Epics

Epics group related stories. A sprint typically has 1-3 epics.

### E{n}: {title}

{One sentence: what this epic delivers.}

#### Stories

| ID | Story | Owner | Depends on | Status |
|----|-------|-------|------------|--------|
| E{n}-S{m} | {title} | {agent} | {deps or —} | NOT STARTED |

<!-- Note: Story status lives on the board, not here. The plan is the design document.
     Don't update story status in the plan — move items on the board instead. -->

#### Story details

##### E{n}-S{m}: {title}
- **What:** {concrete deliverable}
- **Files:** {paths to create or modify}
- **Acceptance:** {how to know it's done}
- **Notes:** {implementation notes, gotchas, decisions}

## Dependency graph

{ASCII or markdown showing what blocks what. Keep it simple.}

## Verification checklist

After all work completes:

- [ ] {concrete verification step}
- [ ] {another one}
```

## Kanban board format

The board is the single source of truth for what's happening right now. **Update it every time work moves.** If a session is interrupted, the board tells the next session exactly where things stand.

```markdown
# Sprint {n} board

Last updated: {timestamp}

## Backlog
| ID | Item | Owner | Type | Notes |
|----|------|-------|------|-------|

## In Progress
| ID | Item | Owner | Type | Started | Notes |
|----|------|-------|------|---------|-------|

## In Review
| ID | Item | Owner | Type | Notes |
|----|------|-------|------|-------|

## Done
| ID | Item | Owner | Type | Completed | Notes |
|----|------|-------|------|-----------|-------|

## Blocked
| ID | Item | Owner | Type | Blocked by | Notes |
|----|------|-------|------|------------|-------|
```

**Item types:**
- `spike` — exploratory work with a question to answer
- `story` — implementation work with a deliverable
- `task` — small unit of work within a story (optional granularity)
- `bug` — defect found during the sprint
- `review` — team review of a section

**Board rules:**
1. When starting work on an item, move it to In Progress with a timestamp.
2. When work completes, move it to Done with a completion timestamp.
3. When blocked, move to Blocked with the blocker ID or description.
4. When a spike completes and its decision gate produces new stories, add them to Backlog.
5. Bugs discovered during the sprint get added to Backlog with type `bug`.
6. The board is append-forward — don't delete items, move them through columns.

## Resuming a sprint

If Doug says "where are we", "resume", "continue", or anything suggesting pickup rather than new work:

1. Read the current sprint's `board.md` — this is the source of truth.
2. Read `plan.md` for full context on items.
3. Summarize:
   - What's Done (briefly)
   - What's In Progress (these may be interrupted — check if they're actually complete)
   - What's Blocked and why
   - What's next in the Backlog
4. Recommend the next move. If something is In Progress from a prior session, verify its state before continuing.

<!-- citations -->
[project tracker]: .claude/project/index.md
[roles]: .claude/team/roles/
[agents]: .claude/team/agents
[agent registry]: .claude/team/agents/registry.json
[abilities]: .claude/team/abilities/

$ARGUMENTS
