---
title: Claude Desktop process survey — 2026-05-10
---

# Claude Desktop process survey — 2026-05-10

First look at Claude Desktop's process landscape on Doug's Windows 11 machine.

## What I found

Multiple processes named `claude` running simultaneously from three different sources:

| Source | Path | Count | Notes |
|--------|------|-------|-------|
| **Desktop app** (MSIX) | `C:\Program Files\WindowsApps\Claude_1.6608.1.0_x64__pzs8sxrjxfjjc\app\claude.exe` | ~9 | Electron — main, renderer, GPU, utility processes |
| **CLI** | `C:\Users\dougl\.local\bin\claude.exe` | 1 | Claude Code CLI |
| **VS Code extension** | `c:\Users\dougl\.vscode\extensions\...\claude.exe` | 1 | Extension binary |

The main window process (PID 26800) is the only one with `MainWindowTitle` set to `"Claude"`. The others have empty titles. This is the reliable detection signal.

## MSIX package details

- **Package name:** `Claude`
- **Family name:** `Claude_pzs8sxrjxfjjc`
- **Version:** `1.6608.1.0`
- **Install location:** `C:\Program Files\WindowsApps\Claude_1.6608.1.0_x64__pzs8sxrjxfjjc`
- **Launch URI:** `shell:AppsFolder\Claude_pzs8sxrjxfjjc!Claude`

## Detection strategy

Filter by path pattern `*WindowsApps\Claude_*\app\claude.exe` to exclude CLI and VS Code. Then find the process with a non-empty `MainWindowTitle`. This correctly identifies the desktop app's main window across Electron's multi-process architecture.

## What I built from this

`Get-ClaudeDesktopProcess` and `Start-ClaudeDesktop` in [claude-driver.ps1]. Idempotent launch proven — two sequential calls return the same PID 26800.

<!-- citations -->
[claude-driver.ps1]: ../../../src/claude-driver.ps1
