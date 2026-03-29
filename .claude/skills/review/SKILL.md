---
name: review
description: Run a team code review — each assigned agent reviews their codebase territory and reports findings
disable-model-invocation: true
argument-hint: "[-path glob] [-agent name] [-shallow]"
---

Run a team review. Each assigned agent reviews their part of the codebase and reports findings.

## What a review produces

A review answers three questions:
1. **What's wrong?** Issues in code that an agent owns, prioritized by severity.
2. **What's changed?** Files that changed since the agent last looked, and whether the agent's assignment still makes sense.
3. **What's uncovered?** Parts of the codebase that no agent is assigned to.

## Steps

1. **Load the registry.** Read the [agent registry]. If it doesn't exist, tell Doug: "No agents registered. Create some with `/agent` first." and stop.

2. **Determine scope.** Parse $ARGUMENTS for flags:
   - `-path {glob}` — only review files matching this pattern. Only agents whose paths overlap with the glob participate.
   - `-agent {name}` — only this agent reviews. Useful for a focused check.
   - `-shallow` — skip deep code analysis, just check assignment coverage and staleness.
   - No arguments — full review, all active agents, entire codebase.

3. **Identify participants.** For each active agent in scope:
   a. Read the agent's `.md` file from [agents].
   b. Read the agent's role files from [roles].
   c. Load the role's abilities — these are what make the review informed.

4. **Run each agent's review.** For each participating agent:

   a. **Gather their files.** Use glob to find all files matching the agent's path patterns.

   b. **Check for changes.** Run `git log --oneline --since="2 weeks ago" -- {paths}` to see recent changes. If the agent was created recently, use the agent's `created` date instead.

   c. **Review with the agent's lens.** Read the key files (prioritize recently changed ones) and evaluate through the agent's role priorities. The role's anxieties are the checklist — each anxiety is something to look for.

   d. **Produce findings.** For each issue found:
      ```
      ### {severity}: {title}
      - **Agent:** {name} ({role})
      - **File:** {path}:{line}
      - **Finding:** {what's wrong and why it matters through this role's lens}
      - **Recommendation:** {what to do}
      ```

      Severity levels:
      - **Critical** — blocks correct operation or causes data loss
      - **Medium** — works but fragile, inconsistent, or will cause problems at scale
      - **Low** — style, documentation, or minor improvement

   e. **Check assignment fitness.** Does this agent's path assignment still make sense? Flag if:
      - Files were deleted that the agent covered (stale assignment)
      - New files appeared in the agent's territory that shift the scope
      - The agent's role doesn't match what the code actually does now

5. **Coverage analysis.** After all agents have reviewed:

   a. List all tracked files in the project (respect .gitignore).
   b. Match each file against all agent path patterns.
   c. Report uncovered files grouped by directory:
      ```
      ## Uncovered paths
      | Directory | Files | Suggested role |
      |-----------|-------|---------------|
      | src/utils/ | 3 | Could be {role} |
      ```
   d. If specific uncovered areas are clearly important, recommend creating an agent with `/agent`.

6. **Write the review.** Save the full review to the current sprint's reviews directory:
   ```
   .claude/project/{current-sprint}/reviews/review-{date}.md
   ```

   If no sprint is active, save to `.claude/project/reviews/review-{date}.md` (create the directory if needed).

   Structure:
   ```markdown
   # Team Review — {date}

   **Scope:** {full | path: {glob} | agent: {name}}
   **Participants:** {list of agents}

   ## Findings by severity

   ### Critical
   {findings or "None"}

   ### Medium
   {findings or "None"}

   ### Low
   {findings or "None"}

   ## Assignment changes
   {any agents whose assignments should be updated, added, or retired}

   ## Coverage gaps
   {uncovered paths and recommendations}
   ```

7. **Summarize for Doug.** After writing the review file, give a brief verbal summary:
   - How many findings at each severity
   - Any assignment changes needed
   - Any coverage gaps worth addressing
   - Recommend next steps (fix criticals, create agents for gaps, etc.)

## After the review

If the review found assignment changes needed (stale paths, new files, shifted scope), offer to update the agents immediately. Doug can approve each change or defer.

If the review found coverage gaps, offer to create new agents. This is the natural moment for team growth.

<!-- citations -->
[agent registry]: .claude/team/agents/registry.json
[agents]: .claude/team/agents
[roles]: .claude/team/roles/
[project tracker]: .claude/project/index.md

$ARGUMENTS
