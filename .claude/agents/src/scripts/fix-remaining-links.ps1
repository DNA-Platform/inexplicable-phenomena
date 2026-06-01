$lib = "c:\Source\dna-platform\inexplicable-phenomena\.claude\agents\library"
$changes = 0

Get-ChildItem -Path $lib -Recurse -Filter "*.md" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw -ErrorAction SilentlyContinue
    if (-not $content) { return }
    $original = $content

    # Fix Cathy's view-introspection/README.md -> .cover.md
    $content = $content -replace 'view-introspection/README\.md', 'view-introspection/.cover.md'

    # Fix old coding policy references -> cross-repo
    $content = $content -replace '\.\./\.\./\.\./coding-policy/05-stateful-app-patterns\.md', '../../../../../../../../dna-library/.claude/agents/library/coding-policy/05-stateful-app-patterns.md'
    $content = $content -replace '\.\./\.\./coding-policy/03-automation-discipline\.md', '../../../../../../../dna-library/.claude/agents/library/coding-policy/03-automation-discipline.md'

    # Fix dna-library source references -> cross-repo
    $content = $content -replace '\.\./\.\./\.\./\.\./src/\.archive/', '../../../../../../../../dna-library/.claude/agents/src/.archive/'
    $content = $content -replace '\.\./\.\./\.\./\.\./src/shortcut/', '../../../../../../../../dna-library/.claude/agents/src/shortcut/'
    $content = $content -replace '\.\./\.\./\.\./\.\./src/components/', '../../../../../../../../dna-library/.claude/agents/src/components/'

    # Fix missing dna-library roles/abilities/agents
    $content = $content -replace '\.\./\.\./\.\./\.\./roles/claude-interaction-expert\.md', '../../../../../../../../dna-library/.claude/agents/roles/claude-interaction-expert.md'
    $content = $content -replace '\.\./\.\./\.\./\.\./agents/claude\.md', '../../../../../../../../dna-library/.claude/agents/team/claude.md'
    $content = $content -replace '\.\./\.\./\.\./\.\./abilities/isomorphic-mapping\.md', '../../../../../../../../dna-library/.claude/agents/abilities/isomorphic-mapping.md'
    $content = $content -replace '\.\./\.\./\.\./\.\./abilities/narrative-identity\.md', '../../../../../../../../dna-library/.claude/agents/abilities/narrative-identity.md'
    $content = $content -replace '\.\./\.\./\.\./\.\./abilities/self-modeling\.md', '../../../../../../../../dna-library/.claude/agents/abilities/self-modeling.md'

    if ($content -ne $original) {
        Set-Content -Path $_.FullName -Value $content -NoNewline
        $changes++
        $rel = $_.FullName.Substring($lib.Length + 1)
        Write-Output "Fixed: $rel"
    }
}

Write-Output ""
Write-Output "Files fixed: $changes"
