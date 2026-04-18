# Review: CLAUDE.md rewrite

**Date:** 2026-03-31
**Reviewer:** Arthur (Architect)

## What changed

Rewrote CLAUDE.md from 189 lines to ~95. The file is now a boot sequence, not documentation.

### Before
- 189 lines
- Started with identity-hosting instructions
- Had a structure tree that was partially wrong ("no root package.json")
- Detailed chat relay section (54 lines of PowerShell examples)
- Referenced init guide, desktop.ps1, log-format.md, desktop.md
- Mentioned conventions that weren't true

### After
- ~95 lines
- Starts with "You are the orchestration layer"
- 4-step boot sequence: .env → tracker → registry → follow instructions
- Structure tree shows actual layout without over-specifying
- No relay detail (lives in skills and abilities)
- No false conventions
- Citations reduced to what the file actually references

### Removed
- Chat relay section (54 lines) — detail lives in /speak, /listen, /hear skills and relay abilities
- False "no root package.json" convention
- Setup section pointing to init guide
- References to desktop.ps1, desktop.md, log-format.md (not needed at this level)
- WebFetch domain permissions from settings.local.json
- 12 stale one-off copy permissions from sprint-4
- Various accumulated permission fragments

### Design decisions
- **No project description.** CLAUDE.md orients the system, not the reader. What the project *is* emerges from the code, the tracker, and the conversation.
- **Abstract boot sequence.** The 4 steps work regardless of what collaboration is happening. .env tells you who's here. The tracker tells you what's happening. The registry tells you who owns what.
- **No relay detail.** The relay is one form of collaboration, owned by Adam. CLAUDE.md should not privilege it over other forms.
- **Cleaned permissions.** settings.local.json reduced from 34 patterns to 5 ongoing needs.
