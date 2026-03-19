Start or stop the collaborator's voice listener.

If the argument is "-off" or "off" or "stop":
  1. Find any running background tasks that are polling listen.ps1
  2. Stop them with TaskStop
  3. Say only: "Listener stopped."

Otherwise (no arguments, or any other argument):
  1. Check if a listen.ps1 poll task is already running in the background. If so, say "Already listening." and stop.
  2. Start the listener:
     ```
     powershell -ExecutionPolicy Bypass -File ".eirian/src/listen.ps1" -Poll -IntervalSeconds 5
     ```
     Run this in the background.
  3. Say only: "Listening."

$ARGUMENTS
