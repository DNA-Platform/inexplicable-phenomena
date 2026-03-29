# File Locking

**Used by:** Pace (primary)

Preventing data corruption when the listener and /hear access conversation.log concurrently. The listener appends entries. /hear reads and updates status. Both need safe access.

## The concurrent access pattern

```
Listener (PowerShell background task)     /hear (Claude Code)
─────────────────────────────────────     ──────────────────
Append new entry                          Read all entries
  [needs write lock]                        [needs read access]
                                          Update status on one entry
                                            [needs write lock]
```

These operations are fast (< 100ms each), so contention is rare. But when it happens, one process needs to wait.

## .NET file stream locking

PowerShell has access to .NET's `System.IO.File` API, which provides proper file locking.

### For appending (listener writes):
```powershell
$stream = [System.IO.File]::Open(
    $LogPath,
    [System.IO.FileMode]::Append,       # create if missing, seek to end
    [System.IO.FileAccess]::Write,       # write only
    [System.IO.FileShare]::Read          # allow others to READ while we write
)
$writer = New-Object System.IO.StreamWriter($stream, [System.Text.Encoding]::UTF8)
$writer.Write($content)
$writer.Flush()
$writer.Close()
$stream.Close()
```

This locks the file for exclusive write but allows concurrent reads. Another writer will get an IOException.

### For status updates (/hear writes):
```powershell
# Read the full file
$log = Get-Content $LogPath -Raw -Encoding UTF8

# Modify in memory
$log = $log -replace $pattern, $replacement

# Write back with exclusive lock
$stream = [System.IO.File]::Open(
    $LogPath,
    [System.IO.FileMode]::Create,        # truncate and rewrite
    [System.IO.FileAccess]::Write,
    [System.IO.FileShare]::None           # exclusive — no concurrent access
)
$writer = New-Object System.IO.StreamWriter($stream, [System.Text.Encoding]::UTF8)
$writer.Write($log)
$writer.Flush()
$writer.Close()
$stream.Close()
```

Note: `FileShare::None` means this blocks both readers and writers. Keep it brief.

## Retry on lock contention

When a file is locked by another process, the open call throws `System.IO.IOException`. Retry:

```powershell
$retries = 3
for ($i = 0; $i -lt $retries; $i++) {
    try {
        $stream = [System.IO.File]::Open(...)
        # ... do work ...
        break
    } catch [System.IO.IOException] {
        if ($i -lt $retries - 1) {
            Start-Sleep -Milliseconds 200
        } else {
            throw
        }
    }
}
```

200ms between retries, 3 attempts max. If still locked after 600ms, something is seriously wrong (process hung with lock held).

## What NOT to use

- `Set-Content` / `Add-Content` — no file locking, no control over share mode
- `Out-File` — same problem
- `[System.IO.File]::WriteAllText` — no share mode control
- `[System.IO.File]::AppendAllText` — no share mode control

These are fine for files that aren't accessed concurrently. For conversation.log, always use the stream-based approach.

## What to verify when using this ability

- [ ] Append operations use `FileShare::Read` (allow concurrent reads)
- [ ] Status updates use `FileShare::None` (brief exclusive lock)
- [ ] All stream operations are in try/catch with retry logic
- [ ] Streams are always closed (even on error) — use try/finally or dispose
- [ ] Lock duration is minimized (do computation outside the lock, only lock for I/O)
