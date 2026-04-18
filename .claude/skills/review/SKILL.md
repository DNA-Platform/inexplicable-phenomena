---
name: review
description: Review code through an agent's lens — scoped by path, concern, or agent
argument-hint: "[files, description, or concern] [-agent name]"
---

Review code. Find who owns it, load their perspective, and report what you see — what the code does, where it's fragile, what's strong, and what should change.

## Parsing the request

The input is natural language. It may contain:

- **Files or paths** — explicit (`library/chemistry/src/particle.tsx`) or descriptive ("the catalogue system", "the build config", "all the archive code")
- **A concern** — what Doug wants examined ("how does view wrapping work", "is the type system sound", "what are the dependencies between these")
- **An agent override** — `-agent cathy` or just "have the architect look at this". Overrides the default owner.
- **No arguments** — full review across all agents' territories.

Parse `$ARGUMENTS` for these elements. If ambiguous about which files, resolve it:

1. If a description like "the relay system" is given, use `/responsible` to find which agent owns that territory, then glob their paths.
2. If a single file is named, review just that file.
3. If a directory or glob is given, review all matching files.
4. If only an agent is named with no path, review all files in that agent's territory.
5. If nothing is given, run a full review (see "Full review mode" below).

## Finding the reviewer

Use the [responsible skill] logic to determine ownership:

1. Match the files against the [agent registry].
2. **Specific agents are primary** — agents with targeted path patterns (not `**`).
3. **Arthur is always secondary** — his `**` catch-all means he sees everything. His voice is always present in a review.

**Agent override:** If `-agent {name}` is specified, that agent leads the review regardless of ownership. This is intentional — applying a *different perspective* to code reveals things the owner's lens misses. The override agent's role shapes the review; Arthur still contributes his architectural lens.

**No override, no specific owner:** If files fall in Arthur-only territory (no specific agent), Arthur is primary. His diagnostic question — "what depends on this, and what does it depend on?" — is the default lens for unowned code.

## Loading the lens

For each reviewing agent:

1. Read the agent's `.md` file from [agents].
2. Read the agent's role file from [roles].
3. Load the role's abilities from [abilities].
4. Read the source files the role specifies.

The role's **diagnostic first question** opens the review. The role's **anxieties** become the checklist. The role's **mantra** breaks ties.

## Conducting the review

Read every file in scope. For each file or logical group:

### 1. Understand

Describe what the code does before judging it. Name the abstractions, trace the data flow, identify the contracts. A review that jumps to findings without demonstrating comprehension is untrustworthy.

### 2. Probe

Apply each of the role's anxieties as a probe:
- Does this code **trigger** the anxiety? That's a finding.
- Does this code **prevent** the anxiety? That's a strength.
- Neither? Move on.

Don't fabricate concerns. If the code is sound through a particular lens, say so.

### 3. Surface

Report what's not obvious from reading the code alone:
- Implicit contracts the code assumes but doesn't enforce
- Hidden dependencies not visible in the import graph
- Missing tests for load-bearing behavior
- Naming mismatches where the name suggests one thing and the code does another
- Dead paths that can't be reached

### 4. Recommend

For each finding, state what to do and how urgent it is:
- **Now** — will cause problems in the current sprint
- **Soon** — will cause problems when the code grows or integrates
- **Eventually** — technical debt worth tracking
- **Intentional** — this looks wrong but isn't; document it, don't fix it

## Output format

```markdown
## Review: {description of what was examined}

**Reviewer:** {name} ({role})
**Scope:** {files examined}
**Diagnostic question:** {the role's first question, answered for this code}

### Understanding

{What the code does — precise, demonstrating comprehension}

### Findings

#### {title} — {urgency}
- **File:** {path}:{line}
- **Anxiety:** {which role anxiety this triggers, or "general"}
- **Finding:** {what's wrong and why it matters through this role's lens}
- **Recommendation:** {what to do}

### Strengths

{What the code does well — especially things that actively prevent the role's anxieties}

### Summary

{2-3 sentences. Is this code in good shape? What's the single most important thing to address?}
```

When Arthur contributes as secondary reviewer, his findings appear in a separate section after the primary reviewer's.

## Full review mode

When no arguments are given, run a systematic review across all agents:

1. Load the [agent registry]. List all active agents.
2. For each agent, glob their paths and check `git log --oneline --since="2 weeks ago" -- {paths}` for recent changes.
3. Each agent reviews their territory, prioritizing recently changed files.
4. After all agents review, run a coverage analysis:
   - List all tracked files (respect .gitignore).
   - Match each against agent path patterns.
   - Report Arthur-only files grouped by directory — these are potential gaps worth assigning.
5. If uncovered areas are clearly important, recommend creating an agent with `/agent`.

## Saving the review

Save the full review to the current sprint's reviews directory:

```
.claude/project/{current-sprint}/reviews/review-{date}.md
```

If no sprint is active, save to `.claude/project/reviews/review-{date}.md`.

## After the review

If the review found stale assignments (deleted files, shifted scope), offer to update agents. If it found coverage gaps, offer to create new agents. A review is the natural moment for team growth.

<!-- citations -->
[agent registry]: .claude/team/agents/registry.json
[agents]: .claude/team/agents
[roles]: .claude/team/roles/
[abilities]: .claude/team/abilities/
[responsible skill]: .claude/skills/responsible/SKILL.md

$ARGUMENTS
