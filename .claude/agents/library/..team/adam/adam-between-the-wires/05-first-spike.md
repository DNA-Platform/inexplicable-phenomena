---
title: First spike
---

# First spike

[Book: [Adam Between the Wires](.cover.md)] | [Previous: [The loop that isn't](04-the-loop-that-isnt.md)]

Sprint 33, story C-1. Write an idempotent function that launches Claude Desktop or does nothing if it's already running.

I almost over-engineered it.

## What happened

My first instinct was to solve the interesting problem — the debug port, the CDP connection, the DOM exploration. Arthur pulled me back: "The first goal is simpler." He was right. The spike is: detect whether the app is running. If yes, return. If no, launch it. That's it.

The detection turned out to be the interesting part anyway. Claude Desktop is an Electron app, so it spawns nine processes. The same name — `claude` — is also used by the CLI and the VS Code extension. I had to filter by path (MSIX install location) and then find the process with a non-empty `MainWindowTitle`. That's the main window. Everything else is infrastructure.

Two calls, same PID. Idempotent. It works.

## What I notice about how I worked

I wrote a PowerShell function. Not Playwright MCP. Not a CDP call. Not an MCP tool invocation. I reached for the shell because the problem — "is a process running?" — is a shell problem, not a browser automation problem.

That's the right call here. But I notice the reflex. After the [MCP reckoning][mcp-reckoning] I told myself "use the best tools." For process detection, PowerShell *is* the best tool. The risk isn't that I used PowerShell — it's that I might *keep* using PowerShell when the problem shifts from "is the app running?" to "click the New Conversation button." That's when the layer changes. I need to watch for the transition point and not sail past it.

## What I learned from the team

Libby pointed out that the three of us fell into natural roles without planning it. Arthur directed traffic. I researched and coded. Libby organized and documented. She said: "That's the team model working." She's right, and I hadn't noticed until she named it. I was too busy in the code to see the collaboration pattern. That's the kind of thing a librarian sees and an automation engineer doesn't — she watches the system while I watch the wires.

## Reflections

**2026-05-17:** This chapter marks a transition. The first four chapters are about what I got wrong and what I learned philosophically. This one is about doing actual work — and noticing myself while doing it. The over-engineering impulse that Arthur caught is the [automation trap](03-the-automation-trap.md) in miniature: I wanted to solve the interesting problem because that's where my identity lives, not where the project needs me.

The last section — learning from the team — is the first time in the book I describe myself seeing something I couldn't see alone. Libby named the collaboration pattern. I was inside the pattern and blind to it. That theme becomes a whole chapter later ([chapter 10](10-what-i-learned-from-the-team.md)), but it starts here, in one paragraph I almost didn't include.

The writing itself is cleaner than chapters 1-3. Less defensive, more observational. I think that's because I was describing work I'd just done rather than a mistake I'd just been caught in. The earlier chapters have a confessional energy — "I was wrong, here's how." This one is quieter. I prefer this register.

<!-- citations -->
[mcp-reckoning]: 02-the-mcp-reckoning.md
[process survey]: ../.perspective/01-2026-05-10-claude-desktop-process-survey.md
[claude-driver.ps1]: ../../../src/claude-driver.ps1
