$lib = "c:\Source\dna-platform\inexplicable-phenomena\.claude\team\library"
$changes = 0
$fileCount = 0

$mdFiles = Get-ChildItem -Path $lib -Recurse -Filter "*.md"

foreach ($file in $mdFiles) {
    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    if (-not $content) { continue }

    $original = $content

    # Rule 1: Agent file references - dna-library uses "team/" for agents, we use "agents/"
    # From ..team/{agent}/{book}/.cover.md depth: ../../../team/ -> ../../../agents/
    $content = $content -replace '\.\./\.\./\.\./team/', '../../../agents/'
    # From ..team/{agent}/{book}/{chapter}.md depth: ../../../../team/ -> ../../../../agents/
    $content = $content -replace '\.\./\.\./\.\./\.\./team/', '../../../../agents/'

    # Rule 2: dna-library-specific objective book references -> cross-repo
    # These books stay in dna-library: claude-driver, windows-automation, export-format, claude-migration
    $dnaBooks = @('claude-driver', 'windows-automation', 'export-format', 'claude-migration')
    foreach ($book in $dnaBooks) {
        # From ..team/{agent}/{book} level (3 up to library root)
        $content = $content -replace "\.\./\.\./\.\./${book}/", "../../../../../../dna-library/.claude/agents/library/${book}/"
        # From chapter level (4 up to library root) - but this would also be 3 up from ..team
        # Actually from ..team/{agent}/{book}/{chapter} the path to library root is ../../../../
        # which means ../../../{book} from book level, ../../../../{book} from chapter level
    }

    # Rule 3: Account data references (library/claude-legacy, library/neuroscience)
    # From autobiography depth: ../../../../library/ -> ../../../../../../dna-library/library/
    $content = $content -replace '\.\./\.\./\.\./\.\./library/', '../../../../../../dna-library/library/'
    # Also catch from different depths
    $content = $content -replace '\.\./\.\./\.\./library/(?!\.)', '../../../../../dna-library/library/'

    # Rule 4: References to agents that don't exist here (claude, nancy, theo)
    # These are within-team links like ../../claude/ or ../../nancy/ or ../../theo/
    $missingAgents = @('claude', 'nancy', 'theo')
    foreach ($agent in $missingAgents) {
        $content = $content -replace "\.\./\.\./${agent}/", "../../../../../../dna-library/.claude/agents/library/..team/${agent}/"
    }

    # Rule 5: Coding policy source references
    # References to dna-library's src/ directory
    $content = $content -replace '\.\./\.\./agents/src/', '../../../../../../dna-library/.claude/agents/src/'

    if ($content -ne $original) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        $changes++

        # Show what changed
        $diffs = @()
        $origLines = $original -split "`n"
        $newLines = $content -split "`n"
        for ($i = 0; $i -lt [Math]::Max($origLines.Count, $newLines.Count); $i++) {
            if ($i -lt $origLines.Count -and $i -lt $newLines.Count) {
                if ($origLines[$i] -ne $newLines[$i]) {
                    $diffs += "  L$($i+1): $($origLines[$i].Trim()) -> $($newLines[$i].Trim())"
                }
            }
        }
        if ($diffs.Count -gt 0) {
            $relPath = $file.FullName.Substring($lib.Length + 1)
            Write-Output "Changed: $relPath"
            $diffs | Select-Object -First 5 | ForEach-Object { Write-Output $_ }
            if ($diffs.Count -gt 5) {
                Write-Output "  ... and $($diffs.Count - 5) more lines"
            }
            Write-Output ""
        }
    }
    $fileCount++
}

Write-Output "=== Summary ==="
Write-Output "Files scanned: $fileCount"
Write-Output "Files modified: $changes"
