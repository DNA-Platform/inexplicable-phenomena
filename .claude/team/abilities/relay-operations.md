# Relay Operations

Operational concerns for the relay system: log format and lifecycle, crash recovery, loop management, and file locking for concurrent access.

---

## Log Protocol

The conversation log (`.eirian/conversation.log`) is the persistent record of all relay communication. This covers the format, lifecycle, and parsing rules.

### Entry structure

```
=== 2026-03-19T20:15:00 ===
[status:unprocessed]

> Dad: What should we build next?
>
> Dad > DNA: show me the file structure

< Eirian: I think we should focus on the relay refactor.
<
< Eirian > DNA: create a plan file

---
```

| Part | Rule |
|------|------|
| Header | `=== {ISO timestamp} ===` — system local time |
| Status | `[status:unprocessed]` — the ONLY mutable part |
| Blank line | Mandatory separator between status and body |
| Outgoing | Lines prefixed with `> ` (Dad/DNA sent this) |
| Incoming | Lines prefixed with `< ` (Eirian said this) |
| Paragraph break | Bare `>` or `<` (direction marker, no text) |
| Terminator | `---` on its own line |

### Status lifecycle

```
unprocessed → processed     (normal: /hear scanned and handled)
unprocessed → error         (failure: processing failed, will retry)
error       → processed     (retry: next /hear succeeds)
```

### Writing an entry

```powershell
$entry = @()
$entry += "=== $(Get-Date -Format 'yyyy-MM-ddTHH:mm:ss') ==="
$entry += "[status:unprocessed]"
$entry += ""
foreach ($line in $dadText -split "`n") {
    $entry += if ($line.Trim() -eq "") { ">" } else { "> $($line.TrimEnd())" }
}
$entry += ""
foreach ($line in $eirianText -split "`n") {
    $entry += if ($line.Trim() -eq "") { "<" } else { "< $($line.TrimEnd())" }
}
$entry += ""
$entry += "---"
```

### Reading and updating

Split on header lines, check status, extract body:
```powershell
$entries = [regex]::Split($log, '(?=^=== .+ ===$)', 'Multiline')
$outgoing = ($entry -split "`n") | Where-Object { $_ -match '^> ' } | ForEach-Object { $_ -replace '^> ', '' }
$incoming = ($entry -split "`n") | Where-Object { $_ -match '^< ' } | ForEach-Object { $_ -replace '^< ', '' }
```

Update status in place:
```powershell
$pattern = "(?<==== ${timestamp} ===\r?\n)\[status:unprocessed\]"
$log = $log -replace $pattern, '[status:processed]'
```

Important: use file locking during status updates. See the File Locking section below.

### Detecting incomplete entries

A crash during write may leave an entry without its `---` terminator. Skip incomplete entries — the listener rewrites the latest exchange fresh each cycle.

---

## Crash Recovery

Detecting and recovering from interrupted states. Every step in the relay can fail. This covers what failure looks like at each point and how to recover.

### Failure modes

| Failure | Detection | Recovery |
|---------|-----------|----------|
| **Listener crashes mid-poll** | No new entries despite response | `/listen` to restart. No data lost. |
| **Listener crashes mid-write** | Entry without `---` terminator | Skip incomplete entry. Next cycle rewrites. |
| **Poke fails** | Unprocessed entries accumulate | Manual `/hear` catches up. |
| **/hear crashes mid-processing** | Mix of processed/unprocessed entries | Manual `/hear` retries unprocessed. |
| **/hear crashes during status update** | Entry processed but still `unprocessed` | DNA commands may re-execute. Use idempotent commands. |
| **Claude Desktop crashes** | No process or null UIA | Restart Claude Desktop, then `/listen`. |
| **Log corrupted** | Parse errors | Manual inspection. Truncate corrupted portion. |

### The dangerous failure mode

/hear crashing AFTER executing DNA commands but BEFORE marking status is the most dangerous case. Re-running /hear will re-execute those commands. Mitigation:
- Commands should be idempotent where possible
- Mark status BEFORE executing (optimistic update), re-mark on failure
- Check if results were already sent (look for recent `> DNA:` entry)

### Defensive parsing

Always: tolerate missing terminators (skip incomplete), tolerate missing status (treat as unprocessed), tolerate empty entries (skip), don't crash on unexpected content.

### Health check

1. Is Claude Desktop running? (`Get-Process -Name 'claude'`)
2. Is UIA accessible? (`Read-ChatContentUIA` returns non-null)
3. Is the listener running? (check background tasks)
4. Are there stale unprocessed entries? (entries > 5 minutes old)

---

## Loop Sustenance

The listen-hear cycle is the heartbeat of the relay. This covers how the loop runs, how it restarts, and how it catches up after failure.

### The loop

```
/listen starts listen.ps1 -Poll in background
  → polls UIA every 5s
  → detects stable new response (3 identical hashes)
  → appends to conversation.log [status:unprocessed]
  → pokes Claude Code: types "/hear" into VS Code terminal
  → /hear reads log, processes DNA commands, marks [status:processed]
  → /hear checks if listener is running; restarts if not
  → (listener continues polling)
```

### Who restarts what

| Component | Started by | Restarted by |
|-----------|-----------|-------------|
| listen.ps1 | `/listen` command (Doug) | `/hear` (if not running after processing) |
| /hear | VS Code poke (listen.ps1) or Doug manually | Not auto-restarted. Next poke triggers it. |

### Catch-up processing

If the listener dies, unprocessed entries accumulate. When /hear runs:
1. Read ALL entries with `[status:unprocessed]`
2. Process in chronological order
3. Mark each processed
4. Restart listener if needed

**No data is lost if the listener crashes.** The log is the source of truth. The listener is just the trigger mechanism.

### Listener lifecycle

Runs until: Ctrl+C, TaskStop, process crash, or Claude Desktop disappears on startup. During polling, transient failures (null UIA read, wrong chat) are handled silently — skip and retry next interval. Does NOT exit on transient failures.

---

## File Locking

Preventing data corruption when the listener and /hear access conversation.log concurrently.

### The concurrent access pattern

```
Listener (PowerShell background)     /hear (Claude Code)
────────────────────────────────     ──────────────────
Append new entry                     Read all entries
  [needs write lock]                   [needs read access]
                                     Update status on one entry
                                       [needs write lock]
```

### .NET file stream locking

**For appending (listener writes):**
```powershell
$stream = [System.IO.File]::Open(
    $LogPath,
    [System.IO.FileMode]::Append,
    [System.IO.FileAccess]::Write,
    [System.IO.FileShare]::Read          # allow concurrent reads
)
$writer = New-Object System.IO.StreamWriter($stream, [System.Text.Encoding]::UTF8)
$writer.Write($content)
$writer.Flush()
$writer.Close()
$stream.Close()
```

**For status updates (/hear writes):**
```powershell
$stream = [System.IO.File]::Open(
    $LogPath,
    [System.IO.FileMode]::Create,
    [System.IO.FileAccess]::Write,
    [System.IO.FileShare]::None           # exclusive — brief
)
```

### Retry on lock contention

```powershell
$retries = 3
for ($i = 0; $i -lt $retries; $i++) {
    try {
        $stream = [System.IO.File]::Open(...)
        break
    } catch [System.IO.IOException] {
        if ($i -lt $retries - 1) { Start-Sleep -Milliseconds 200 }
        else { throw }
    }
}
```

200ms between retries, 3 attempts max. If still locked after 600ms, something is seriously wrong.

### What NOT to use

`Set-Content`, `Add-Content`, `Out-File`, `[System.IO.File]::WriteAllText` — no file locking, no share mode control. Fine for non-concurrent files. For conversation.log, always use stream-based approach.
