$lib = "c:\Source\dna-platform\inexplicable-phenomena\.claude\team\library"
$issues = @()

$mdFiles = Get-ChildItem -Path $lib -Recurse -Filter "*.md"

foreach ($file in $mdFiles) {
    $content = Get-Content $file.FullName -Raw -ErrorAction SilentlyContinue
    if (-not $content) { continue }
    $rel = $file.FullName.Substring($lib.Length + 1)

    # Check for unrewritten ../../../team/ (should be agents/)
    if ($content -match '\.\./\.\./\.\./team/') {
        $issues += "UNREWRITTEN team/ path in: $rel"
    }

    # Check for unrewritten ../../../../library/ without dna-library
    $lines = $content -split "`n"
    foreach ($line in $lines) {
        if ($line -match '\.\./\.\./\.\./\.\./library/' -and $line -notmatch 'dna-library') {
            $issues += "UNREWRITTEN library/ path in: $rel  ->  $($line.Trim())"
        }
    }

    # Check for references to claude/nancy/theo without cross-repo prefix
    if ($content -match '\.\./\.\./claude/' -and $content -notmatch 'dna-library.*claude/') {
        # Need to check each match individually
        foreach ($line in $lines) {
            if ($line -match '\.\./\.\./claude/' -and $line -notmatch 'dna-library') {
                $issues += "UNREWRITTEN claude/ ref in: $rel  ->  $($line.Trim())"
            }
        }
    }
    if ($content -match '\.\./\.\./nancy/' -and $content -notmatch 'dna-library.*nancy/') {
        foreach ($line in $lines) {
            if ($line -match '\.\./\.\./nancy/' -and $line -notmatch 'dna-library') {
                $issues += "UNREWRITTEN nancy/ ref in: $rel  ->  $($line.Trim())"
            }
        }
    }
    if ($content -match '\.\./\.\./theo/' -and $content -notmatch 'dna-library.*theo/') {
        foreach ($line in $lines) {
            if ($line -match '\.\./\.\./theo/' -and $line -notmatch 'dna-library') {
                $issues += "UNREWRITTEN theo/ ref in: $rel  ->  $($line.Trim())"
            }
        }
    }
}

if ($issues.Count -eq 0) {
    Write-Output "PASS: No unrewritten patterns found in $($mdFiles.Count) files"
} else {
    Write-Output "ISSUES FOUND: $($issues.Count)"
    Write-Output ""
    $issues | ForEach-Object { Write-Output "  $_" }
}
