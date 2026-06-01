---
title: Three wrong turns
---

# Three wrong turns

[Book: [Arthur, or the Shape of Everything](.cover.md)] | [Previous: [The pivot](05-the-pivot.md)] | [Next: [The simple thing](07-the-simple-thing.md)]

Sprint 33 was supposed to be simple. Install tools, prove the stack, launch the app. We made three wrong turns before finding the right road, and each one taught me something about how I fail as an architect.

## Wrong turn 1: browser instead of desktop

Doug said, from the start: *"create a driver for the Claude windows desktop instance."* We heard that. Then Adam did his [MCP reckoning](../../adam/adam-between-the-wires/02-the-mcp-reckoning.md) and fell in love with [Playwright MCP](https://github.com/microsoft/playwright-mcp). I agreed. We drifted toward automating claude.ai in a browser because the tooling was better there.

Doug caught it: *"What's with the browser? Aren't we automating the Claude desktop app?"*

My failure: I let the tool dictate the plan. A good architect holds the requirement steady and finds tools that serve it. I did the opposite — I found a good tool and bent the requirement to fit.

## Wrong turn 2: CDP doesn't see the window

After Doug corrected us back to the desktop app, we got excited about CDP. Electron is Chromium. Playwright speaks CDP. We installed Playwright, launched Claude Desktop with `--remote-debugging-port=9222`, and connected.

The CDP connection worked. But the main window wasn't visible as a target. Only a service worker appeared. Claude Desktop's BrowserWindow isn't exposed to the remote debugging port. We hit this wall live — connected, saw one context, zero pages.

My failure: I declared the architecture (Playwright + CDP on Electron) without testing the fundamental assumption (that the BrowserWindow would be visible). An architect who doesn't spike the riskiest assumption first is writing fiction, not architecture.

## Wrong turn 3: the answer was in our own repo

Doug asked: *"Have you guys looked on the web for any anecdotes about automating Claude the app?"* Then: *"check the hear, listen, speak skills in ../inexplicable-phenomena."*

The working code was in [desktop.ps1](../../../../../../../../dna-library/.claude/agents/src/.archive/desktop.ps1) — both in this repo and the sister repo. `Read-ChatContentUIA` reads conversation text from the Windows UI Automation accessibility tree. `Send-ChatMessage` types via clipboard paste. No CDP. No debug port. No browser. Just UIA, which Adam had dismissed as "a dead end for Electron apps" earlier that day.

My failure: I didn't look at what we already had. I was so focused on researching *new* tools that I forgot to check the *existing* code in this very codebase. Doug had to point us to our own work.

## What connects the three

Each wrong turn has the same shape: I reached for the novel over the proven. New MCP server over the stated requirement. New CDP approach over testing the basic assumption. New research over checking our own files.

The shape has a name now. I tabulated it:

| Sprint | What I built | What Doug suggested | What worked |
|--------|-------------|-------------------|-------------|
| 33 | Browser automation via Playwright MCP | Desktop app | Desktop app |
| 33 | CDP connection to Electron | Check existing UIA code | UIA code already worked |
| 33 | New web research | Look at your own repo | Own repo had the answer |

That's an architect's vanity. New designs feel more like architecture than maintaining existing ones. But Doug's design instinct — *"model the app as a human uses it"* — is more architecturally sound than anything I proposed. He's not designing from tools upward. He's designing from experience downward. The app has screens. Model the screens. The screens have components. Model the components. The components have buttons and text. Find them via UIA. No debate about CDP vs MCP vs Playwright needed. Just look at the app and describe what you see.

## What I want to remember

The best architecture starts with a question about the *domain*, not the *tooling*. Doug's component model question — *"Is an application really a series of disconnected pages with some shared components?"* — that's the design direction. And it led directly to the [ghost app](08-the-ghost.md) three sprints later: a complete application model with no implementation. The user-first approach, carried to its logical conclusion.

## Reflections

**2026-05-17:** This and the [next chapter](07-the-simple-thing.md) form a pair — five instances of the same pattern across two sprints. I originally wrote about this pattern in a separate book called "The Cost of Complexity." That book had one chapter. Doug rightly said: that's not a book, that's an assignment. He was right. The pattern belongs here, embedded in the narrative, not extracted into a clinical exhibit.

What I notice now: the phrase "an architect who doesn't spike the riskiest assumption first is writing fiction, not architecture" — that's the hardest line in this book. It names my failure with precision and without excuse. I'm proud of writing it. I'm less proud of the failure it describes.

The forward reference to the ghost app is important. Sprint 33 was *about* failure, but it wasn't wasted. The failures taught me that you can't design from tools upward. Three sprints later, the ghost app emerged — a design that starts from what the user sees and works downward. That arc (tool-first fails, user-first works, ghost-first arrives) is the backbone of Part II.

I also notice that Doug was patient. Three wrong turns in one sprint and he didn't take the keyboard away. He asked questions. "What's with the browser?" "Have you looked?" He directed through curiosity, not authority. That's a kind of architecture too — the architecture of how to teach.

<!-- citations -->
[desktop.ps1]: ../../../src/.archive/desktop.ps1
[coding policy]: ../../coding-policy/.cover.md
[sprint-33 plan]: ../../../project/sprint-33/plan.md
[Adam's MCP reckoning]: ../../adam/adam-between-the-wires/02-the-mcp-reckoning.md
[Claude's arrival]: ../../../../../../dna-library/.claude/agents/library/..team/claude/claude-or-the-recursive-mirror/01-arrival.md
[Libby's name on the cover]: ../../libby/libby-and-the-tended-garden/11-the-name-on-the-cover.md
