$root = "c:\Source\dna-platform\inexplicable-phenomena"
$issues = @()
$checked = 0
$broken = 0

# Scan all .md files in .claude/
$mdFiles = Get-ChildItem -Path "$root\.claude" -Recurse -Filter "*.md"

foreach ($file in $mdFiles) {
    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    if (-not $content) { continue }
    $dir = Split-Path $file.FullName -Parent

    # Find all markdown links: [text](path) and [ref]: path
    # Inline links
    $inlineMatches = [regex]::Matches($content, '\[([^\]]*)\]\(([^)]+)\)')
    foreach ($m in $inlineMatches) {
        $linkPath = $m.Groups[2].Value
        # Skip URLs, anchors, mailto
        if ($linkPath -match '^(https?://|mailto:|#)') { continue }
        # Skip dna-library cross-repo references
        if ($linkPath -match 'dna-library') { continue }
        # Remove anchor fragments
        $linkPath = $linkPath -replace '#.*$', ''
        if (-not $linkPath) { continue }

        $resolved = Join-Path $dir $linkPath
        $resolved = [System.IO.Path]::GetFullPath($resolved)
        $checked++

        if (-not (Test-Path $resolved)) {
            $rel = $file.FullName.Substring($root.Length + 1)
            $broken++
            $issues += "BROKEN: $rel -> $linkPath"
        }
    }

    # Reference-style links: [name]: path
    $refMatches = [regex]::Matches($content, '^\[([^\]]+)\]:\s+(.+)$', [System.Text.RegularExpressions.RegexOptions]::Multiline)
    foreach ($m in $refMatches) {
        $linkPath = $m.Groups[2].Value.Trim()
        if ($linkPath -match '^(https?://|mailto:|#)') { continue }
        if ($linkPath -match 'dna-library') { continue }
        $linkPath = $linkPath -replace '#.*$', ''
        if (-not $linkPath) { continue }

        $resolved = Join-Path $dir $linkPath
        $resolved = [System.IO.Path]::GetFullPath($resolved)
        $checked++

        if (-not (Test-Path $resolved)) {
            $rel = $file.FullName.Substring($root.Length + 1)
            $broken++
            $issues += "BROKEN: $rel -> $linkPath"
        }
    }
}

# Also check CLAUDE.md at root
$claudeMd = Get-Content "$root\CLAUDE.md" -Raw
$dir = $root
$refMatches = [regex]::Matches($claudeMd, '^\[([^\]]+)\]:\s+(.+)$', [System.Text.RegularExpressions.RegexOptions]::Multiline)
foreach ($m in $refMatches) {
    $linkPath = $m.Groups[2].Value.Trim()
    if ($linkPath -match '^(https?://|mailto:|#)') { continue }
    $resolved = Join-Path $dir $linkPath
    $resolved = [System.IO.Path]::GetFullPath($resolved)
    $checked++
    if (-not (Test-Path $resolved)) {
        $broken++
        $issues += "BROKEN: CLAUDE.md -> $linkPath"
    }
}

Write-Output "=== Link Check Results ==="
Write-Output "Files scanned: $($mdFiles.Count + 1)"
Write-Output "Links checked: $checked"
Write-Output "Broken links: $broken"
Write-Output ""

if ($issues.Count -gt 0) {
    $issues | ForEach-Object { Write-Output $_ }
} else {
    Write-Output "ALL LINKS VALID"
}
