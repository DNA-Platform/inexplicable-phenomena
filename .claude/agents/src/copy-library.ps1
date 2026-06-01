$src = "c:\Source\dna-platform\dna-library\.claude\agents\library"
$dst = "c:\Source\dna-platform\inexplicable-phenomena\.claude\team\library"

# Copy field guide
Write-Output "Copying .librarianship..."
Copy-Item -Path "$src\.librarianship" -Destination "$dst\.librarianship" -Recurse -Force
$count = (Get-ChildItem "$dst\.librarianship" -Recurse -File).Count
Write-Output "  .librarianship: $count files"

# Copy coding policy
Write-Output "Copying coding-policy..."
Copy-Item -Path "$src\coding-policy" -Destination "$dst\coding-policy" -Recurse -Force
$count = (Get-ChildItem "$dst\coding-policy" -Recurse -File).Count
Write-Output "  coding-policy: $count files"

# Copy team autobiographies and books for shared agents
$agents = @('arthur','adam','libby','cathy','david','phillip','queenie')
foreach ($agent in $agents) {
    $agentSrc = "$src\..team\$agent"
    $agentDst = "$dst\..team\$agent"
    if (Test-Path $agentSrc) {
        Write-Output "Copying ..team/$agent..."
        # Copy everything from the agent's team library
        Get-ChildItem -Path $agentSrc -Recurse | ForEach-Object {
            $rel = $_.FullName.Substring($agentSrc.Length)
            $target = "$agentDst$rel"
            if ($_.PSIsContainer) {
                New-Item -ItemType Directory -Path $target -Force | Out-Null
            } else {
                $parentDir = Split-Path $target -Parent
                if (-not (Test-Path $parentDir)) {
                    New-Item -ItemType Directory -Path $parentDir -Force | Out-Null
                }
                Copy-Item -Path $_.FullName -Destination $target -Force
            }
        }
        $count = (Get-ChildItem $agentDst -Recurse -File -ErrorAction SilentlyContinue).Count
        Write-Output "  ..team/${agent} - ${count} files"
    } else {
        Write-Output "  ..team/${agent} - no source directory in dna-library"
    }
}

# Summary
$total = (Get-ChildItem "$dst\..team" -Recurse -File -ErrorAction SilentlyContinue).Count
$fieldGuide = (Get-ChildItem "$dst\.librarianship" -Recurse -File -ErrorAction SilentlyContinue).Count
$codingPolicy = (Get-ChildItem "$dst\coding-policy" -Recurse -File -ErrorAction SilentlyContinue).Count
Write-Output ""
Write-Output "=== Summary ==="
Write-Output "Team library files: $total"
Write-Output "Field guide files: $fieldGuide"
Write-Output "Coding policy files: $codingPolicy"
Write-Output "Total: $($total + $fieldGuide + $codingPolicy)"
