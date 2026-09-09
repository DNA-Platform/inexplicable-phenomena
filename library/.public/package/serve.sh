#!/bin/sh
# THE DEMO SERVERS. Vite reads the package through dist, and its module graph caches that transform,
# so a fresh `npm run build` reaches the browser as "does not provide an export named '$Book'" —
# five times this sprint against a dist that plainly had it. Restarting after a build is the fix;
# this script is here so the restart is one command and never forgotten.
R="C:/Source/dna-platform/inexplicable-phenomena"
P="$R/library/.public/package"
powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \"Name='node.exe'\" | Where-Object { \$_.CommandLine -like '*vite*531*' } | ForEach-Object { Stop-Process -Id \$_.ProcessId -Force }" >/dev/null 2>&1
sleep 2
rm -rf "$R/node_modules/.vite"
npx --prefix "$R" vite "$P/.latex/.public" --port 5310 --strictPort >/dev/null 2>&1 &
npx --prefix "$R" vite "$P/.wiki/.public" --port 5311 --strictPort >/dev/null 2>&1 &
sleep 12
echo "paper on http://localhost:5310/  ·  wiki on http://localhost:5311/"
