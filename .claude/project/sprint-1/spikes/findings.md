# SetWinEventHook Spike: Findings

**Date:** 2026-03-16
**Target:** Claude Desktop (Electron 40.4.1, MSIX package)
**Goal:** Can we use event-driven monitoring instead of polling to detect new messages?

## Process Architecture

Claude Desktop runs as ~11 processes:
- **Main browser process** (PID varies) — owns the window (`Chrome_WidgetWin_1` class), has `MainWindowHandle`
- **Renderer processes** (4-5) — `--type=renderer`, these run the web content
- **GPU process** — `--type=gpu-process`
- **Utility processes** — network, audio, video capture
- **Crashpad handler**

Important: Claude CLI (`~/.local/bin/claude.exe`) also shows up as `claude.exe`. Filter by path containing `WindowsApps` to get Desktop only.

## WinEvent Results

### Idle State (no user interaction, no streaming)
| Approach | Events/sec | Event Types |
|----------|-----------|-------------|
| Per-PID hook (main process, 5s) | ~4/s | OBJ_DESTROY (0x8001), OBJ_HIDE (0x8003) |
| Per-PID hook (renderer processes) | 0/s | None |
| Per-PID hook (all 11 processes) | 0/s | None (per-PID hooks appear to not work reliably with Electron) |
| System-wide hook filtering by PID | ~0.8/s from Claude | OBJ_HIDE, OBJ_DESTROY from main process only |

### Key Observations

1. **Per-PID hooks are unreliable with Electron.** When hooking a specific PID, we sometimes get events and sometimes get 0. The system-wide hook with PID filtering is more reliable.

2. **Renderer processes fire NO WinEvents.** This is the critical finding. Chromium renders web content in renderer processes via GPU compositing. The renderer process never creates Win32 windows or fires Win32 accessibility events. Content changes happen entirely within the Chromium rendering pipeline.

3. **Only the main (browser) process fires events**, and these are window-management events (create/destroy/hide for internal Chrome windows), not content events.

4. **No content-related events observed at idle:**
   - EVENT_OBJECT_NAMECHANGE (0x800C): Never fired
   - EVENT_OBJECT_VALUECHANGE (0x800E): Never fired
   - EVENT_OBJECT_LIVEREGIONCHANGED (0x8019): Never fired
   - EVENT_OBJECT_CONTENTSCROLLED (0x8015): Never fired
   - EVENT_OBJECT_TEXTSELECTIONCHANGED (0x8014): Never fired

## UIA (UI Automation) Results

### Idle State
- **Zero UIA events** (StructureChanged, PropertyChanged, TextChanged) in 10 seconds.
- Chromium does not proactively fire UIA events for DOM changes unless accessibility is explicitly engaged.

### Tree Structure
- UIA tree is very shallow: ~10 elements at depth 5
- A `Document` element exists with only 1 child (Chromium virtualizes the tree)
- Tree traversal takes ~26ms for the full depth — fast enough for polling

### IAccessible
- Works. Main window reports `ROLE_SYSTEM_WINDOW` with 7 children.
- `AccessibleObjectFromWindow` succeeds on the main window handle.

## CDP (Chrome DevTools Protocol)
- **Not available.** No `--remote-debugging-port` in command line, no `DevToolsActivePort` file.
- Could be enabled by modifying Claude Desktop's launch, but that's not a passive approach.

## Conclusions

### SetWinEventHook: NOT viable for content change detection

Electron/Chromium does not fire Win32 accessibility events when web content changes. The rendering happens via GPU compositing in renderer processes that have no Win32 windows. WinEvents only fire for the browser process's Chrome-internal window management (tooltip windows, popup menus, etc.), which gives no signal about content changes.

### What WOULD work (ranked by feasibility)

1. **Polling via Ctrl+A/Ctrl+C** (current approach) — works but invasive, requires focus
2. **Polling via UIA tree** — could detect changes to the Document element's child count/content. ~26ms per check, so polling at 1Hz would cost ~2.6% of a core. But the virtualized tree may not expose the content we need without focus.
3. **CDP via `--remote-debugging-port`** — ideal if we could enable it. Would give us DOM mutation observers, console.log hooks, etc. Requires modifying Claude Desktop's launch configuration.
4. **Named pipe / IPC monitoring** — Claude Desktop communicates with its backend via some IPC mechanism. If we could tap that, we'd know exactly when responses arrive.
5. **Window bitmap diffing** — capture the window bitmap periodically (via PrintWindow or DWM thumbnail), diff pixels. Works without focus but expensive.
6. **Input injection monitoring** — watch for keyboard/mouse events TO Claude Desktop that indicate the user sent a message, then start polling.

### Recommended Next Step

Investigate CDP. If Claude Desktop can be launched with `--remote-debugging-port=9222`, we get:
- DOM MutationObserver via `Runtime.evaluate`
- `Page.domContentEventFired` and similar events
- Full programmatic access to the conversation content
- True event-driven monitoring

This would require either modifying the MSIX package's launch shortcut or finding where Claude Desktop stores its Electron flags.

## Scripts Created

- `event-hook-spike.ps1` — Hooks specific content-related WinEvents for Claude's PID (30s)
- `event-hook-all-spike.ps1` — Hooks ALL WinEvents for all Claude processes (10s)
- `uia-event-spike.ps1` — Subscribes to UIA structure/property/text events (30s)
