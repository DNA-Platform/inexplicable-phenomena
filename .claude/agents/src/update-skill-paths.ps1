$skillsDir = "c:\Source\dna-platform\inexplicable-phenomena\.claude\skills"
$changes = 0

Get-ChildItem $skillsDir -Recurse -Filter "*.md" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue
    if (-not $content) { return }
    $original = $content

    # .claude/team/ -> .claude/agents/
    $content = $content -replace '\.claude/team/', '.claude/agents/'

    # .claude/project/ -> .claude/agents/project/
    $content = $content -replace '\.claude/project/', '.claude/agents/project/'

    # .claude/docs/ -> .claude/agents/docs/
    $content = $content -replace '\.claude/docs/', '.claude/agents/docs/'

    # Fix double-agents: .claude/agents/agents/ -> .claude/agents/team/
    $content = $content -replace '\.claude/agents/agents/', '.claude/agents/team/'

    if ($content -ne $original) {
        Set-Content -Path $_.FullName -Value $content -NoNewline
        $changes++
        $rel = $_.FullName.Substring($skillsDir.Length + 1)
        Write-Output "Updated: $rel"
    }
}

Write-Output ""
Write-Output "Skills updated: $changes"
