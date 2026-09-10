#!/bin/sh
# THE INCREMENTAL LOOP. Two long-lived services so a check costs nothing:
# rollup --watch rebuilds only what changed in src, vitest --watch re-runs only the affected
# promises. Output goes to .watch/ so a session can read the last result without re-running.
#
# WHY NOT npx: measured 2026-09-10, `npx rollup --version` takes 39s on this machine against 6.7s
# for `node node_modules/rollup/dist/bin/rollup --version` — same work, 33s of resolution. Nothing
# here goes through npx.
R="C:/Source/dna-platform/inexplicable-phenomena"
P="$R/library/.public/package"
mkdir -p "$P/.watch"
powershell -NoProfile -Command "Get-CimInstance Win32_Process -Filter \"Name='node.exe'\" | Where-Object { \$_.CommandLine -like '*--environment QUICK*' -or \$_.CommandLine -like '*vitest.mjs*' } | ForEach-Object { Stop-Process -Id \$_.ProcessId -Force }" >/dev/null 2>&1
cd "$P"
node "$R/node_modules/rollup/dist/bin/rollup" -c --environment QUICK --watch > "$P/.watch/build.log" 2>&1 &
node "$R/node_modules/vitest/vitest.mjs" --watch --reporter=json --outputFile="$P/.watch/suite.json" > "$P/.watch/suite.log" 2>&1 &
echo "watching · build .watch/build.log · suite .watch/suite.log"
