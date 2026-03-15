# Initialization

This is the setup procedure for creating your own collaborator workspace.

## Prerequisites

- Claude Desktop installed and logged in
- A Claude project with your collaborator's identity (system prompt, memories, context)
- The project chat URL from Claude Desktop or claude.ai

## Steps

### 1. Create your .env

Copy `.env.example` to `.env` and replace the values:

```
cp .env.example .env
```

The format is `{NAME}-CHAT=<url>`. The name is your collaborator's name in uppercase:

```
SERAPHIMA-CHAT=https://claude.ai/chat/your-chat-id-here
```

### 2. Create the identity folder

Lowercase the name to create the folder, and add it to `.gitignore`:

```
mkdir .seraphima
echo ".seraphima/*" >> .gitignore
```

This folder is yours. It is gitignored so your collaborator's identity, history,
and context stay private to your machine.

### 3. Set up the identity workspace

Copy the structure from an existing identity or create it fresh:

```
mkdir .seraphima/src
```

Create `.seraphima/package.json`:

```json
{
  "name": "seraphima",
  "version": "1.0.0",
  "description": "Seraphima's workspace",
  "private": true
}
```

### 4. Create the relay script

Your relay script lives at `.seraphima/src/relay.ps1`. It dot-sources the
generic desktop automation from `.claude/src/desktop.ps1` and adds
identity-specific behavior:

- **Message prefix**: How your collaborator knows who is speaking (e.g., "Dad: ", "Dev: ")
- **Output files**: Where responses land (`voice.md` for latest, `thoughts.md` for log)
- **VS Code integration**: Which tabs to open after a response arrives

### 5. Connect via Claude Desktop

Your collaborator lives in a Claude project. Claude Desktop is the bridge:

1. Open Claude Desktop
2. Navigate to your collaborator's project conversation
3. The relay script automates the rest — it finds the Claude Desktop window,
   types your message, waits for a response, and writes it to your identity folder

The connection works via Windows UI automation (SendKeys, mouse events,
AppActivate). No browser needed, no API key needed. The Claude Desktop app
must be running.

### 6. Test the relay

```powershell
powershell -ExecutionPolicy Bypass -File .seraphima/src/relay.ps1 -Message "Hello, are you there?"
```

If it works, you'll see the response in `.seraphima/voice.md`.

## How it works

```
You (Claude Code) ──► relay.ps1 ──► Claude Desktop window ──► Collaborator
                                                                    │
.seraphima/voice.md ◄── relay.ps1 ◄── Claude Desktop window ◄──────┘
```

The relay:
1. Finds the Claude Desktop window by title
2. Restores it if minimized
3. Clicks the chat input area
4. Pastes your message via clipboard
5. Presses Enter
6. Waits N seconds for streaming to finish
7. Copies the conversation text (Ctrl+A, Ctrl+C)
8. Extracts the latest response
9. Writes to `voice.md` (latest) and `thoughts.md` (running log)
10. Opens both in VS Code, focuses `voice.md`
11. Re-minimizes Claude Desktop if it was minimized before
