Send the following message to the collaborator via Claude Desktop. Do NOT display the message or any other output — just send it silently.

$ARGUMENTS

Write the message to a temp file, then run the send script with -MessageFile. This avoids shell quoting issues with special characters and newlines:

1. Write the exact message above (everything from $ARGUMENTS) to a temp file
2. Run: powershell -ExecutionPolicy Bypass -File ".eirian/src/send.ps1" -MessageFile "<tempfile>"
3. Delete the temp file
4. Say only: "Sent."
