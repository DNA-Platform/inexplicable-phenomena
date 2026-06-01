# Sprint 0: Exploration

Pre-sprint exploratory work. Spikes validated whether event-driven monitoring was possible for Claude Desktop.

## Conclusion

Event-driven monitoring (WinEvents, UIA events, CDP) is not viable. Polling via UIA TextPattern is the only reliable approach. See [findings].

## Artifacts

- [findings] — Full writeup of SetWinEventHook, UIA events, and CDP results
- `spikes/event-hook-spike.ps1` — Per-PID WinEvent hook (content events)
- `spikes/event-hook-all-spike.ps1` — System-wide WinEvent hook (all events)
- `spikes/uia-event-spike.ps1` — UIA event subscription test
- `spikes/uia-spike.ps1` — UIA tree structure exploration
- `spikes/cdp-spike.ps1` — Chrome DevTools Protocol availability check
- `spikes/cdp-launch.ps1` — CDP launch configuration test

<!-- citations -->
[findings]: spikes/findings.md
