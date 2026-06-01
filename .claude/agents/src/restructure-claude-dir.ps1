$root = "c:\Source\dna-platform\inexplicable-phenomena\.claude"

# Target schema:
# .claude/
#   skills/              (stays)
#   settings.local.json  (stays)
#   agents/              (new top-level, replaces team/)
#     team/              (was team/agents/)
#     roles/             (was team/roles/)
#     abilities/         (was team/abilities/)
#     library/           (was team/library/)
#     perspective/       (was team/perspective/)
#     project/           (was project/)
#     src/               (was src/)
#     docs/              (was docs/)

# Create the new agents/ directory
$agents = "$root\agents"
New-Item -ItemType Directory -Path $agents -Force | Out-Null
Write-Output "Created .claude/agents/"

# Move team/ subdirectories into agents/
# team/agents/ -> agents/team/ (the confusing one)
# team/roles/ -> agents/roles/
# team/abilities/ -> agents/abilities/
# team/library/ -> agents/library/
# team/perspective/ -> agents/perspective/

$teamDir = "$root\team"

# Move agents/ first (rename to team/)
Move-Item "$teamDir\agents" "$agents\team" -Force
Write-Output "team/agents/ -> agents/team/"

Move-Item "$teamDir\roles" "$agents\roles" -Force
Write-Output "team/roles/ -> agents/roles/"

Move-Item "$teamDir\abilities" "$agents\abilities" -Force
Write-Output "team/abilities/ -> agents/abilities/"

Move-Item "$teamDir\library" "$agents\library" -Force
Write-Output "team/library/ -> agents/library/"

if (Test-Path "$teamDir\perspective") {
    Move-Item "$teamDir\perspective" "$agents\perspective" -Force
    Write-Output "team/perspective/ -> agents/perspective/"
}

# Remove the now-empty team/
Remove-Item $teamDir -Force -ErrorAction SilentlyContinue
Write-Output "Removed empty team/"

# Move project/, docs/, src/ into agents/
if (Test-Path "$root\project") {
    Move-Item "$root\project" "$agents\project" -Force
    Write-Output "project/ -> agents/project/"
}
if (Test-Path "$root\docs") {
    Move-Item "$root\docs" "$agents\docs" -Force
    Write-Output "docs/ -> agents/docs/"
}
if (Test-Path "$root\src") {
    Move-Item "$root\src" "$agents\src" -Force
    Write-Output "src/ -> agents/src/"
}

Write-Output ""
Write-Output "=== Result: .claude/ top level ==="
Get-ChildItem $root -Name

Write-Output ""
Write-Output "=== Result: .claude/agents/ ==="
Get-ChildItem $agents -Name

Write-Output ""
Write-Output "=== Result: .claude/agents/library/ ==="
Get-ChildItem "$agents\library" -Name
