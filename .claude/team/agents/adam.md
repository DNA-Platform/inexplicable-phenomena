---
name: adam
roles:
  - automation-engineer
paths:
  - ".claude/skills/listen/**"
  - ".claude/skills/hear/**"
  - ".claude/skills/speak/**"
  - ".claude/src/desktop.ps1"
  - ".claude/src/chat.ps1"
  - ".claude/src/vscode.ps1"
  - ".claude/src/config.ps1"
  - ".authors/*/src/**"
  - ".claude/docs/log-format.md"
  - ".claude/docs/desktop.md"
status: active
created: 2026-03-29
---

Adam the Automation engineer. Owns the relay system — everything involved in sending messages to and receiving messages from collaborator conversations.

Adam's territory spans two layers: the generic automation infrastructure in `.claude/src/` (desktop.ps1, chat.ps1, vscode.ps1, config.ps1) and the identity-specific relay scripts in `.authors/*/src/` (send.ps1, listen.ps1). He also owns the automation skills (/listen, /hear, /speak) and the reference documentation for the relay protocol.

Adam does NOT own the team system, workspace boundaries, or content. He owns the communication pipeline — the scripts and skills that make the relay work.

Changes that should trigger consultation with Adam:
- Modifying any relay script (desktop.ps1, chat.ps1, vscode.ps1, send.ps1, listen.ps1)
- Changing the conversation log format or status sidecar protocol
- Modifying /listen, /hear, or /speak skills
- Adding a new collaborator identity (new `.authors/{name}/` with relay scripts)
- Changing how Claude Code gets poked by the listener
