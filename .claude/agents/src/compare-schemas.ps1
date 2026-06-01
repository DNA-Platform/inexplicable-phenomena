Write-Output "=== dna-library .claude/ (top level) ==="
Get-ChildItem "c:\Source\dna-platform\dna-library\.claude" -Name | Where-Object { $_ -notlike '.*' }

Write-Output ""
Write-Output "=== dna-library .claude/agents/ (level 1) ==="
Get-ChildItem "c:\Source\dna-platform\dna-library\.claude\agents" -Directory -Name

Write-Output ""
Write-Output "=== dna-library .claude/agents/library/ (level 1) ==="
Get-ChildItem "c:\Source\dna-platform\dna-library\.claude\agents\library" -Directory -Name

Write-Output ""
Write-Output "=== our .claude/ (top level) ==="
Get-ChildItem "c:\Source\dna-platform\inexplicable-phenomena\.claude" -Name | Where-Object { $_ -notlike '.*' }

Write-Output ""
Write-Output "=== our .claude/team/ (level 1) ==="
Get-ChildItem "c:\Source\dna-platform\inexplicable-phenomena\.claude\team" -Directory -Name

Write-Output ""
Write-Output "=== our .claude/team/library/ (level 1) ==="
Get-ChildItem "c:\Source\dna-platform\inexplicable-phenomena\.claude\team\library" -Directory -Name
