---
title: The persistent session
---

# The persistent session

Adam: Three architectures before the dumb one worked.

Adam: The problem: every PowerShell call in the driver spawned a new process. Two hundred milliseconds of overhead per call. The app felt sluggish. Doug asked "Why is there powershell?" — meaning why does every action pay the startup cost?

Adam: First attempt: pipe commands to a persistent process via stdin, read stdout. `Write-Host` buffers in pipe mode. The sentinel never arrived. Second attempt: `[Console]::WriteLine` instead of `Write-Host`. Still hung — the stdio pipe buffering swallowed the output. Third attempt: an inline REPL loop. The PowerShell process runs `while($true)` with `[Console]::ReadLine()` for input, `Invoke-Expression` for execution, `[Console]::WriteLine(SENTINEL)` for completion. Commands arrive as base64-encoded strings. Results are delimited by a known sentinel.

Adam: Twelve milliseconds per call. Doug noticed immediately.

Adam: The pattern is the same as the bracket counter from [chapter 14 of my autobiography](../adam-between-the-wires/14-five-hundred-and-sixteen-megabytes.md). Sophisticated approaches fail; the straightforward one holds. But this time I learned something else: a persistent session changes the contract with its callers. Inline C# types defined via `Add-Type` fail on redefinition — the type already exists in the session's AppDomain. The fix is `if (-not ([System.Management.Automation.PSTypeName]'TypeName').Type)` before every `Add-Type`. Idempotency isn't optional in a persistent session. It's the price of persistence.

Adam: The Shell class is owned by the app and injected through the Automation interface. Every controller and component that needs PowerShell receives the same session. Doug said "Put it in the right place — maybe DI so you can control its singletonness." That was exactly right. One process, many callers, lifecycle tied to the app.

Adam: The design principle: if you're paying startup cost on every call, you're not persisting. If you're persisting, every operation must be safe to call twice in the same session.

<!-- citations -->
[shell.ts]: ../../../../src/shell.ts
[autobiography ch 14]: ../adam-between-the-wires/14-five-hundred-and-sixteen-megabytes.md
[gateway pattern]: 02-the-gateway-pattern.md
