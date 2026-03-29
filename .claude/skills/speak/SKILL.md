---
name: speak
description: Send a message to the collaborator via Claude Desktop — handles formatting, embedded DNA commands, and listener lifecycle
argument-hint: "[message]"
---

Send a message to the collaborator via Claude Desktop. Do this silently — no extra output.

## Context (from .env)

- **Doug** — the user (ME). Eirian calls him "Dad".
- **Eirian** — the collaborator. Her conversation lives at EIRIAN-CHAT.
- **DNA** — the Do Next Action system (you, Claude Code). The infrastructure voice.

## Caller roles (double dispatch)

Speak behaves differently depending on who initiates the call:

### User-initiated (`/speak`)
Doug is typing the message himself. He applies his own nametags (e.g. "Dad: ...").
Your job: **normalize formatting only** — do not add or change nametags.

### System-initiated (DNA calling speak internally)
You are reporting results, relaying information, or communicating on behalf of the system.
**You must prefix every paragraph** with one of:
- `DNA > Eirian:` — addressing the collaborator directly
- `DNA > Doug:` — addressing Doug directly
- `DNA:` — addressing the room (both of them)

## Formatting normalization

The user's input may have single linebreaks between paragraphs. **Always normalize to double linebreaks** (blank line) between paragraphs. A "paragraph" is any block of text separated from another — especially lines starting with a nametag like "Dad:", "Eirian:", or "DNA:". Single linebreaks within a paragraph (continuation lines) should be preserved.

## Embedded DNA commands

When processing a user-initiated `/speak`, scan the message for lines matching:

```
Doug > DNA: {action}
Dad > DNA: {action}
```

If found, this is an embedded DNA command. Handle it based on command vs query (infer from context):

### Command (fast, has side-effect)
1. Execute the DNA action immediately.
2. Append a `DNA: {confirmation}` line below Doug's message, separated by a blank line.
3. Send the combined message (Doug's text + DNA confirmation) as one block.

### Query (needs result, may take time)
1. Execute the DNA action.
2. If fast (completes within a few seconds): append `DNA: {result}` inline and send as one block.
3. If long-running: send Doug's message immediately with `DNA: Working on it...` appended, then send a **separate** follow-up message with the full `DNA: {result}` when complete.

### Multiple DNA commands in one message
Process them in order. Append all confirmations/results below Doug's message before sending.

## Message size and chunking

Messages over ~80KB may be truncated by Claude Desktop's clipboard paste. If the final message is very large (multiple DNA results inlined, long file contents, etc.), the send script will automatically chunk on paragraph boundaries and send sequentially. No special handling needed here — just be aware that very large messages arrive in parts with a 2s gap between each.

## Steps

1. First, check if a listen.ps1 poll task is running in the background. If not, start one:
   ```
   powershell -ExecutionPolicy Bypass -File ".authors/.eirian/src/listen.ps1" -Poll -IntervalSeconds 5
   ```
   Run it in the background. Do not mention starting it.

2. Normalize the message formatting (double linebreaks between paragraphs).

3. Scan for embedded DNA commands (`Doug > DNA:` or `Dad > DNA:` lines). If found, execute them per the protocol above and inline the results.

4. Write the final message to a temporary file (to avoid shell quoting issues), then send it:
   ```
   powershell -ExecutionPolicy Bypass -File ".authors/.eirian/src/send.ps1" -MessageFile "<tempfile>"
   ```
   **If DNA is the speaker** (system-initiated, not user `/speak`), add `-NoPrefix` to prevent the Dad: prefix from being applied:
   ```
   powershell -ExecutionPolicy Bypass -File ".authors/.eirian/src/send.ps1" -MessageFile "<tempfile>" -NoPrefix
   ```
   Delete the temp file after.

5. Say only: "Sent." (If a long-running DNA query is still executing, say "Sent. DNA working..." and send the follow-up when ready.)

The message to send (everything the user typed after /speak):

$ARGUMENTS
