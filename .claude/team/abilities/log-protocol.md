# Log Protocol

**Used by:** Pace (primary), Sift (writes entries)

The conversation log (`.eirian/conversation.log`) is the persistent record of all relay communication. This ability covers the format, lifecycle, and parsing rules.

## Entry structure

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

### Components

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

## Writing an entry

The listener writes entries. Each entry captures one exchange: Dad's last message + Eirian's response.

```powershell
$entry = @()
$entry += "=== $(Get-Date -Format 'yyyy-MM-ddTHH:mm:ss') ==="
$entry += "[status:unprocessed]"
$entry += ""
# Outgoing lines
foreach ($line in $dadText -split "`n") {
    $entry += if ($line.Trim() -eq "") { ">" } else { "> $($line.TrimEnd())" }
}
$entry += ""
# Incoming lines
foreach ($line in $eirianText -split "`n") {
    $entry += if ($line.Trim() -eq "") { "<" } else { "< $($line.TrimEnd())" }
}
$entry += ""
$entry += "---"
```

## Reading entries

Split the file on header lines to get entries:

```powershell
$log = Get-Content $LogPath -Raw
# Split on entry headers, keeping the header
$entries = [regex]::Split($log, '(?=^=== .+ ===$)', 'Multiline')
```

For each entry, check status:
```powershell
if ($entry -match '\[status:unprocessed\]') { ... }
```

Extract body lines:
```powershell
$outgoing = ($entry -split "`n") | Where-Object { $_ -match '^> ' } |
    ForEach-Object { $_ -replace '^> ', '' }
$incoming = ($entry -split "`n") | Where-Object { $_ -match '^< ' } |
    ForEach-Object { $_ -replace '^< ', '' }
```

## Updating status

The status is updated in place. Find the entry by its timestamp, replace the status string.

```powershell
$log = Get-Content $LogPath -Raw
# Replace status for a specific entry (match timestamp + status together)
$pattern = "(?<==== ${timestamp} ===\r?\n)\[status:unprocessed\]"
$log = $log -replace $pattern, '[status:processed]'
Set-Content $LogPath $log -Encoding UTF8
```

Important: use file locking during status updates. See `file-locking` ability.

## Detecting incomplete entries

A crash during write may leave an entry without its `---` terminator. Detection:

```powershell
# An entry that has a header but no terminator before the next header (or EOF)
if ($entry -notmatch '---\s*$') { # incomplete }
```

Handling: skip incomplete entries. They'll be rewritten on the next listener cycle (the listener extracts the latest exchange fresh each time, so a missed write just means a one-cycle delay).

## What to verify when using this ability

- [ ] Entries always end with `---`
- [ ] Status line is the only mutable part
- [ ] Direction markers are consistent (`> ` for out, `< ` for in)
- [ ] Blank lines in the message use bare direction markers, not empty strings
- [ ] Timestamps are ISO format (sortable)
