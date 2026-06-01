$lib = "c:\Source\dna-platform\inexplicable-phenomena\.claude\team\library"

Write-Output "=== Library structure ==="
Write-Output ""
Write-Output "Top level:"
Get-ChildItem $lib -Directory -Name

Write-Output ""
Write-Output "Books per agent:"
Get-ChildItem "$lib\..team" -Directory | ForEach-Object {
    $agent = $_.Name
    $books = (Get-ChildItem $_.FullName -Directory -Recurse | Where-Object {
        Test-Path (Join-Path $_.FullName '.cover.md')
    }).Count
    Write-Output "  ${agent}: ${books} books"
}

Write-Output ""
$total = (Get-ChildItem $lib -Recurse -File -Filter '*.md').Count
Write-Output "Total .md files in library: $total"

Write-Output ""
Write-Output "Bridge/unification chapters:"
Get-ChildItem "$lib\..team" -Recurse -Filter '*unification*' -Name
