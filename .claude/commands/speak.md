Send a message to the collaborator via Claude Desktop. Do this silently — no extra output.

1. First, check if a listen.ps1 poll task is running in the background. If not, start one:
   ```
   powershell -ExecutionPolicy Bypass -File ".eirian/src/listen.ps1" -Poll -IntervalSeconds 5
   ```
   Run it in the background. Do not mention starting it.

2. Write the message below to a temporary file (to avoid shell quoting issues), then send it:
   ```
   powershell -ExecutionPolicy Bypass -File ".eirian/src/send.ps1" -MessageFile "<tempfile>"
   ```
   Delete the temp file after.

3. Say only: "Sent."

The message to send (everything the user typed after /speak, preserving newlines):

$ARGUMENTS
