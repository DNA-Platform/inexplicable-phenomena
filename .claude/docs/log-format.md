---
kind: reference
title: Conversation Log Format
status: stable
---

# Conversation Log Format

The conversation log (`.{name}/conversation.log`) is the persistent record of
all relay communication. It replaces `voice.md` as the source of truth.

## Design principles

- **Append-only.** New entries are appended. Existing entries are never deleted.
- **Status-mutable.** The `[status:...]` line in each entry can be updated in place.
- **Human-readable.** Parseable by regex, readable in any text editor.
- **Crash-safe.** Each entry is a self-contained transaction. Partial writes
  are detectable (missing `---` terminator).

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

### Header line

```
=== {ISO 8601 timestamp} ===
```

Always UTC-local (whatever the system clock says). Used for ordering and
display, not as a unique key.

### Status line

```
[status:unprocessed]
```

The embedded status is always `unprocessed`. **It is never updated in place.**

Status tracking lives in a separate sidecar file (see **Status sidecar** below).
The `[status:unprocessed]` line remains in the log as a parsing landmark and a
record that the entry was written by the listener. The log file is **append-only** —
no process ever rewrites it. This eliminates the lost-update race condition where
`/hear`'s read-modify-write could silently overwrite entries the listener appended
between the read and write.

### Status sidecar (`conversation.status.json`)

Lives alongside the log: `.{name}/conversation.status.json`

```json
{
  "2026-03-19T20:15:00": "processed",
  "2026-03-19T20:20:30": "processing",
  "2026-03-19T20:25:00": "unprocessed"
}
```

Keys are entry timestamps (from the `=== timestamp ===` header). Values:

- *(absent)* — equivalent to `unprocessed` (entry not yet seen by `/hear`)
- `processing` — `/hear` is currently executing DNA commands for this entry
- `processed` — `/hear` has completed all DNA commands for this entry
- `poke-failed` — listener couldn't notify `/hear`. Treated as unprocessed.
- `error` — processing failed; `/hear` will warn Doug instead of re-executing

### Status lifecycle

```
(absent) ──→ processing ──→ processed
                  │
                  └──→ error (crash or failure during execution)
```

**Why three phases?** If `/hear` crashes AFTER executing a DNA command but BEFORE
updating status, the entry remains `processing`. On the next run, `/hear` sees
`processing` and warns Doug instead of blindly re-executing — preventing duplicate
file creation, git commits, or config changes.

**Recovery from `processing`:** `/hear` flags these to Doug with the timestamp and
DNA commands found. Doug decides whether to re-execute or mark processed manually.

### Why a sidecar?

The log is shared between two writers: the listener (appends) and `/hear` (used to
do in-place status updates). The lost-update race is structural:

1. `/hear` reads the full log (no lock)
2. Listener appends a new entry (with lock)
3. `/hear` writes back its stale copy (overwrites the append)

Making the log append-only and moving status to a small, independent file eliminates
this race entirely. If the sidecar gets corrupted, the log entries are intact — you
rebuild status by re-scanning. The blast radius of a bug is "re-process a few entries"
instead of "lose entries forever."

### Blank line

A mandatory blank line separates the header from the message body.

### Message body

Each line is prefixed with a direction marker:

| Prefix | Meaning |
|--------|---------|
| `> `   | Outgoing — sent TO Claude Desktop (Dad, DNA) |
| `< `   | Incoming — received FROM Claude Desktop (Eirian) |

Within the body, blank lines between paragraphs use a bare direction marker:
- `>` (no trailing text) for outgoing paragraph breaks
- `<` (no trailing text) for incoming paragraph breaks

### Nametags

Messages carry nametags that identify the speaker and optionally the target:

```
> Dad: message text
> Dad > DNA: action for DNA
> DNA: message from the system
> DNA > Eirian: DNA addressing the collaborator
< Eirian: response text
< Eirian > DNA: action for DNA from collaborator
```

### Entry terminator

```
---
```

Three dashes on their own line. Marks the end of the entry. If this line is
missing, the entry is considered incomplete (partial write / crash).

## Parsing rules

### Finding actionable entries

```
1. Read conversation.log
2. Read conversation.status.json (create empty {} if missing)
3. Split log on /^=== .+ ===$/ to get entries
4. For each entry, extract timestamp from header
5. Look up status in the sidecar:
   - absent or "poke-failed" → actionable (process it)
   - "processing" → warn Doug, do NOT re-execute
   - "processed" → skip
   - "error" → skip (Doug must intervene)
6. For actionable entries: write "processing" to sidecar BEFORE executing
7. After all commands complete, write "processed" to sidecar
8. On failure, write "error" to sidecar
```

### Extracting the last outgoing message

Used by the listener to find what Dad last said (for context in the log):

```
1. Read from the end of the file
2. Find the last entry containing `> ` lines
3. Extract all `> ` prefixed lines, strip the prefix
```

### Extracting Eirian's latest response

```
1. Find the last entry containing `< ` lines
2. Extract all `< ` prefixed lines, strip the prefix
```

### Finding DNA commands

Scan message body for lines matching:
```
> Dad > DNA: {action}
> Doug > DNA: {action}
< Eirian > DNA: {action}
```

The nametag before `> DNA:` identifies who issued the command.

## Concurrency

The listener appends entries while `/hear` reads and updates status.

**Write safety:**
- The listener holds a file lock during append (open with `[System.IO.FileShare]::Read`)
- `/hear` holds a file lock during status updates
- Both operations are fast (< 100ms) so contention is rare

**Read safety:**
- Readers tolerate incomplete entries (missing `---` terminator)
- Status updates are atomic string replacements within a locked write

## Migration from voice.md

`voice.md` is no longer written by the listener. It may be kept for
backward compatibility but is not the source of truth.

The conversation log contains the full history. To see the latest response,
read the last entry with `< ` lines.
