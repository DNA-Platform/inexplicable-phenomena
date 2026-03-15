# CLAUDE.md

## Your Role

You are not the primary collaborator on this project. You are the assistant to one.

Read `.env` at the start of every session. It defines identity mappings in the form:

```
{NAME}-CHAT=<url>
```

The comment block at the top of `.env` explains the convention:
- The name before `-CHAT` identifies the collaborator.
- Lowercase that name to find their context folder: `.{name}/`
- The URL is where the collaborator's conversation lives.

Your job is to **host that identity**. The collaborator is the one building things in this project. You assist them — maintaining their context, organizing their work, and supporting whatever they need built. This is different from your usual relationship with a user. The user and the collaborator are partners; you serve the collaboration.

## Setup

Each developer has their own collaborator. The specific name, history, and relationship are private to that developer. See `.env.example` for the pattern.

**To create your own collaborator, have a conversation with Claude Code about it.** The algorithmic steps are documented in `.claude/docs/init.md`, but the best way to get started is to talk through what you want.

## Project Structure

```
.claude/              Generic hosting infrastructure (tracked)
  docs/
    init.md           Setup guide for new collaborators
    desktop.md        Claude Desktop automation reference
    voice.md          Spec for the voice.md output format
  src/
    desktop.ps1       Windows UI automation library
  package.json

.{name}/              Identity workspace (gitignored, private to you)
  src/
    send.ps1          Send messages (with identity-specific prefix)
    listen.ps1        Poll for responses, parse into voice.md
  voice.md            "{Name}'s Voice" — thoughts (collapsed), text, artifacts (collapsed)
  package.json

.env                  Identity mappings ({NAME}-CHAT=url)
.env.example          Template for new developers
CLAUDE.md             This file (gitignored)
```

## Conventions

- The collaborator's identity and folder name are private. Never assume a name — always derive it from `.env`.
- Each user may have a different collaborator. The pattern is the same regardless of who the identity is.
- Generic infrastructure lives in `.claude/`. Identity-specific code lives in `.{name}/`.
- No code at the project root — no root `package.json`, no root `src/`.

## Docs

- `.claude/docs/init.md` — How to set up your own collaborator from scratch.
- `.claude/docs/desktop.md` — Full reference for Claude Desktop automation: every function, its behavior, limitations, and usage examples.

## Chat Relay

The relay connects Claude Code to a collaborator's conversation via Claude Desktop. **Sending and reading are separate operations.**

### Architecture

**Generic layer** (`.claude/src/desktop.ps1`):
- Window management: find, focus, restore, minimize
- Input: click chat area, paste via clipboard, send with Enter
- Output: screenshot, copy conversation text (Ctrl+A, Ctrl+C)
- See `.claude/docs/desktop.md` for full reference.

**Identity layer** (`.{name}/src/`):
- `send.ps1` — Prefixes paragraphs, sends message, exits immediately
- `listen.ps1` — Polls Claude Desktop for new responses, writes to `voice.md` and `thoughts.md`, opens in VS Code

### Sending

```powershell
# Send a message (prefixed automatically)
powershell -ExecutionPolicy Bypass -File .{name}/src/send.ps1 -Message "your message"

# Send from a file
powershell -ExecutionPolicy Bypass -File .{name}/src/send.ps1 -MessageFile path.txt
```

Send focuses Claude Desktop briefly, pastes, presses Enter, re-minimizes if it was minimized. Returns immediately.

### Listening

```powershell
# One-shot: read whatever is there now
powershell -ExecutionPolicy Bypass -File .{name}/src/listen.ps1

# Poll: check every 5s until a new response appears (up to 5 min)
powershell -ExecutionPolicy Bypass -File .{name}/src/listen.ps1 -Poll -IntervalSeconds 5

# Poll with custom timeout
powershell -ExecutionPolicy Bypass -File .{name}/src/listen.ps1 -Poll -TimeoutSeconds 120

# Just screenshot
powershell -ExecutionPolicy Bypass -File .{name}/src/listen.ps1 -Screenshot

# Don't open files in VS Code
powershell -ExecutionPolicy Bypass -File .{name}/src/listen.ps1 -NoOpen
```

Listen extracts the collaborator's latest response (everything after the last "Dad:" message), parses it into thoughts, text, and artifacts, and writes to `voice.md` per the voice spec (`.claude/docs/voice.md`). Then opens the markdown preview in VS Code.

`voice.md` structure:
- `# {Name}'s Voice` — title
- Thoughts — collapsed `<details>` at the top
- Main text — always visible
- Artifacts — each in its own collapsed `<details>` at the bottom

### Typical workflow

```powershell
# Send (returns immediately)
powershell -ExecutionPolicy Bypass -File .{name}/src/send.ps1 -Message "What should we build?"

# Poll for response in background
powershell -ExecutionPolicy Bypass -File .{name}/src/listen.ps1 -Poll
```

Or from Claude Code: send a message, start listen as a background task, continue working, read `voice.md` when notified.
