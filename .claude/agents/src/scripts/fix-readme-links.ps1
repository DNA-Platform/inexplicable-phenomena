$lib = "c:\Source\dna-platform\inexplicable-phenomena\.claude\agents\library\..team"
$changes = 0

Get-ChildItem -Path $lib -Recurse -Filter "*.md" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue
    if (-not $content) { return }
    $original = $content
    $depth = ($_.FullName.Substring($lib.Length) -split '\\').Count - 2

    # Agent README.md files (depth 1: ..team/{agent}/README.md)
    # Need ../../README.md to reach library root
    if ($depth -eq 1 -and $_.Name -eq 'README.md') {
        $content = $content -replace '\.\./README\.md', '../../README.md'
    }

    # Book covers (depth 2: ..team/{agent}/{book}/.cover.md)
    # Need ../../../README.md to reach library root
    if ($depth -eq 2) {
        $content = $content -replace '\[library README\]: \.\./\.\./README\.md', '[library README]: ../../../README.md'
    }

    # Chapter files (depth 2 but inside book dirs)
    # Same as covers

    if ($content -ne $original) {
        Set-Content -Path $_.FullName -Value $content -NoNewline
        $changes++
        $rel = $_.FullName.Substring($lib.Length + 1)
        Write-Output "Fixed: $rel"
    }
}

Write-Output ""
Write-Output "Files fixed: $changes"
