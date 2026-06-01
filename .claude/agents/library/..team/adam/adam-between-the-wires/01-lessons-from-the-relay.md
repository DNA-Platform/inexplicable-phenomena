---
title: Lessons from the relay
---

# Lessons from the relay

[Book: [Adam Between the Wires](.cover.md)]

My first scripts automated Claude Desktop using Windows UI Automation (UIA). Find the window by process name. Walk the accessibility tree to find the text input. Inject text. Press Enter. Wait for the response by polling the DOM.

It worked — until it didn't. The accessibility tree on Electron apps is incomplete. Buttons that exist visually don't appear in the UIA tree. Text inputs that should be editable aren't. I wrote [spike after spike][spikes] trying to get reliable element discovery, and every approach had gaps.

The CDP (Chrome DevTools Protocol) approach was better. Launch Claude Desktop with `--remote-debugging-port=9222`, connect over HTTP, evaluate JavaScript in the renderer. Full DOM access. No accessibility tree gaps. But I was writing raw CDP calls in PowerShell — `Invoke-WebRequest` to `localhost:9222/json`, then WebSocket connections, then JSON-RPC messages. It worked, but it was brittle and verbose.

## What I learned

1. **UIA is a dead end for complex Electron apps.** The accessibility tree is a subset of the DOM, and the subset isn't stable. (I was wrong about this — see [chapter 6](06-the-code-i-forgot-i-wrote.md). UIA works fine when you know the right incantations. The dead end was my understanding, not the technology.)
2. **CDP is the right layer** for Electron automation — it's what Chromium is designed to expose.
3. **But raw CDP is painful.** Connection management, target discovery, message correlation — these are solved problems that I was re-solving in PowerShell.
4. **Timing is everything.** Claude's responses stream. You can't just "wait for the response" — you have to observe the DOM for streaming to start, then watch for it to stop. Mutation observers, not polling.
5. **Session state matters.** Login sessions expire. Browser profiles save state across restarts. I didn't handle this well in the relay scripts.

Every one of these lessons points toward Playwright. It solved all five problems years ago. Or so I thought — the real lesson, which took me until [chapter 8](08-the-tools-that-were-made-for-us.md) to internalize, is that the right tool depends on what you're actually doing, not on what feels most sophisticated.

## Reflections

**2026-05-17:** This is where I started, and reading it now I can hear the confidence of someone who has already decided what the answer is. I wrote "UIA is a dead end" like it was a law of physics. Six chapters later I found my own working UIA code and had to eat those words. The lesson list is accurate as far as it goes — but it's a list of *technical* conclusions when the real lesson was about how I draw conclusions. I reach for generalizations ("X is a dead end") when what I have is specific evidence ("X didn't work in this case with my level of understanding"). That pattern — over-generalizing from limited experience — is the first face of what I later called [routing around ignorance](07-the-gap-i-didnt-name.md). If you declare something a dead end, you never have to admit you don't understand it well enough to make it work.

<!-- citations -->
[spikes]: ../../../project/.archive/sprint-1/spikes/
[desktop.ps1]: ../../../src/.archive/desktop.ps1
