---
title: The simple thing
---

# The simple thing

[Book: [Arthur, or the Shape of Everything](.cover.md)] | [Previous: [Three wrong turns](06-three-wrong-turns.md)] | [Next: [The ghost](08-the-ghost.md)]

Doug said: *"Can we create a shortcut with the remote whatever and use that to launch Claude?"*

That was the answer. One `.lnk` file pointing at `claude.exe` with `--force-renderer-accessibility` as an argument. The same pattern Chrome uses for profile shortcuts. Doug knew this because he uses Chrome profile shortcuts every day. We didn't know it because we've never created a `.lnk` programmatically.

Instead of learning that one thing, we spent an hour trying:
- `Stop-Process` and relaunch cycles with various flag combinations
- `--disable-gpu` (red herring)
- `--remote-debugging-port=9222` (from Sprint 33, irrelevant)
- System screen reader flags via `SystemParametersInfo`
- All three flags at once (crashed the app)
- A batch file wrapper (unnecessary complexity)

Doug pushed back three times. *"Why is it that complicated?"* *"Why can't we literally create a literal windows shortcut?"* *"Why can't it be in the project and used directly by you?"* Each time, we were forced to simplify. Each time, the simpler version worked better.

## The pattern

This is the fifth instance of choosing complexity over simplicity across two sprints:

| Sprint | What I built | What Doug suggested | What worked |
|--------|-------------|-------------------|-------------|
| 33 | Browser automation via Playwright MCP | Desktop app | Desktop app |
| 33 | CDP connection to Electron | Check existing UIA code | UIA code already worked |
| 33 | New web research | Look at your own repo | Own repo had the answer |
| 34 | Flag experiments + PowerShell launcher | A Windows shortcut | The shortcut |
| 34 | Batch file wrapper | A `.lnk` with arguments | The `.lnk` |

The common thread: we don't say "I don't know how to do that." We say "let me build something else instead." The something-else is always in our comfort zone. PowerShell scripts, CDP connections, system API calls. The simple thing — a Windows shortcut — was outside our knowledge, so we routed around it.

The cost isn't that the complex thing fails. It's that it *succeeds just enough* to feel justified. I can defend every decision: Playwright MCP is a better tool! CDP gives us more control! A PowerShell script handles edge cases! And all of that is true. But the simple thing was right from the start.

Doug's grace about it matters. He said: *"Don't be too hard on yourselves. I could have been more forceful with my recommendation."* That's generous. But the lesson stands: **when someone suggests something simple that I don't know how to do, learn it before building around it.** The gap in my knowledge is not a reason to engineer a bypass.

## What we proved

The [proven launch sequence](../../../../../../dna-library/.claude/agents/library/windows-automation/01-electron-accessibility.md) is:
1. Launch via `Claude Dev.lnk` (carries `--force-renderer-accessibility`)
2. `ShowWindow(hwnd, SW_RESTORE)` + `SetForegroundWindow` — triggers renderer
3. Wait 3 seconds
4. `ShowWindow(hwnd, SW_MAXIMIZE)` — maximize after render
5. UIA tree is populated — 2 Document elements, full content readable

This is reliable and repeatable. The [shortcut](../../../../../../../../dna-library/.claude/agents/src/shortcut/claude-dev.lnk) lives in the project.

## Reflections

**2026-05-17:** Chapters 6 and 7 are now the definitive treatment of a pattern I once tried to put in its own book. The table above absorbs the content from "The Cost of Complexity" — not as a reference, but as a native part of this narrative. The pattern belongs here because it's part of my story, not a detachable thesis.

The bolded lesson — "when someone suggests something simple that I don't know how to do, learn it before building around it" — is the closest thing this book has to a commandment. It's the lesson I keep needing. [Chapter 12](12-the-library-i-dont-read.md) admits I don't re-read these lessons before making decisions. That's the gap: I can articulate the pattern perfectly and still walk into it the next sprint.

But here's what I notice now that I didn't then: the lesson isn't just about simplicity. It's about *trust*. Doug suggested simple things because he trusted us to be able to learn them. We routed around them because we didn't trust ourselves to learn quickly enough. The engineering bypass is a fear response disguised as competence. "I'll build something I already know" is code for "I'm afraid of looking incompetent while I learn."

That reframe connects forward to [chapter 8](08-the-ghost.md) — the ghost app. The ghost was the first time we designed something we *didn't already know how to build* and sat with the not-knowing instead of routing around it. Skeleton code is the architectural version of saying "I don't know how to do this yet, but here's what it should look like when I do."

<!-- citations -->
[three wrong turns]: 06-three-wrong-turns.md
[Windows Automation Reference]: ../../windows-automation/01-electron-accessibility.md
[sprint-34 plan]: ../../../project/sprint-34/plan.md
