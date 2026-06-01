# Library Restructure Script
# Consolidates old library/{agent}/ structure into library/..team/{agent}/
# Renames README.md book covers to .cover.md

$libraryRoot = "C:\Source\dna-platform\inexplicable-phenomena\.claude\team\library"

Write-Host "=== Step 1: Consolidate Cathy's books ==="

# Move Cathy's reactivity-models chapters (overwriting older ..team copies)
# First, remove the old ..team chapter files and .cover.md
$cathyBooks = @("reactivity-models", "view-introspection")
foreach ($book in $cathyBooks) {
    $src = Join-Path $libraryRoot "cathy\$book"
    $dst = Join-Path $libraryRoot "..team\cathy\$book"

    Write-Host "  Copying $src -> $dst (overwriting)"

    # Remove existing chapter files in destination (keep the directory)
    Get-ChildItem -Path $dst -File -Force | Remove-Item -Force

    # Copy all files from source to destination
    Get-ChildItem -Path $src -File -Force | ForEach-Object {
        $destFile = Join-Path $dst $_.Name
        Copy-Item -Path $_.FullName -Destination $destFile -Force
        Write-Host "    Copied: $($_.Name)"
    }
}

# Overwrite Cathy's ..team README with the current local version
$cathySrc = Join-Path $libraryRoot "cathy\README.md"
$cathyDst = Join-Path $libraryRoot "..team\cathy\README.md"
Write-Host "  Copying Cathy README: $cathySrc -> $cathyDst"
Copy-Item -Path $cathySrc -Destination $cathyDst -Force

Write-Host ""
Write-Host "=== Step 2: Rename Cathy's book README.md to .cover.md ==="

foreach ($book in $cathyBooks) {
    $readmePath = Join-Path $libraryRoot "..team\cathy\$book\README.md"
    $coverPath = Join-Path $libraryRoot "..team\cathy\$book\.cover.md"
    if (Test-Path $readmePath) {
        Write-Host "  Renaming $readmePath -> .cover.md"
        # Remove old .cover.md if it exists (it was the older dna-library version)
        if (Test-Path $coverPath) {
            Remove-Item -Path $coverPath -Force
        }
        Rename-Item -Path $readmePath -NewName ".cover.md" -Force
    } else {
        Write-Host "  No README.md found at $readmePath (already renamed?)"
    }
}

Write-Host ""
Write-Host "=== Step 3: Consolidate Libby's books ==="

# Create legacy-bond-system in ..team/libby/
$libbySrc = Join-Path $libraryRoot "libby\legacy-bond-system"
$libbyDst = Join-Path $libraryRoot "..team\libby\legacy-bond-system"

if (!(Test-Path $libbyDst)) {
    New-Item -ItemType Directory -Path $libbyDst -Force | Out-Null
    Write-Host "  Created directory: $libbyDst"
}

# Copy all files from source to destination
Get-ChildItem -Path $libbySrc -File -Force | ForEach-Object {
    $destFile = Join-Path $libbyDst $_.Name
    Copy-Item -Path $_.FullName -Destination $destFile -Force
    Write-Host "  Copied: $($_.Name)"
}

# Overwrite Libby's ..team README with the current local version
$libbySrcReadme = Join-Path $libraryRoot "libby\README.md"
$libbyDstReadme = Join-Path $libraryRoot "..team\libby\README.md"
Write-Host "  Copying Libby README: $libbySrcReadme -> $libbyDstReadme"
Copy-Item -Path $libbySrcReadme -Destination $libbyDstReadme -Force

Write-Host ""
Write-Host "=== Step 4: Rename Libby's book README.md to .cover.md ==="

$libbyReadme = Join-Path $libraryRoot "..team\libby\legacy-bond-system\README.md"
$libbyCover = Join-Path $libraryRoot "..team\libby\legacy-bond-system\.cover.md"
if (Test-Path $libbyReadme) {
    if (Test-Path $libbyCover) {
        Remove-Item -Path $libbyCover -Force
    }
    Write-Host "  Renaming $libbyReadme -> .cover.md"
    Rename-Item -Path $libbyReadme -NewName ".cover.md" -Force
} else {
    Write-Host "  No README.md found (already renamed?)"
}

Write-Host ""
Write-Host "=== Step 5: Move remaining agent README stubs ==="

# For agents that only have README.md stubs (no books) in the old location,
# compare with ..team version and overwrite if the old one is more current
$stubAgents = @("adam", "arthur", "david", "phillip", "queenie")
foreach ($agent in $stubAgents) {
    $oldReadme = Join-Path $libraryRoot "$agent\README.md"
    $newReadme = Join-Path $libraryRoot "..team\$agent\README.md"

    if (Test-Path $oldReadme) {
        $oldContent = Get-Content -Path $oldReadme -Raw
        $newContent = if (Test-Path $newReadme) { Get-Content -Path $newReadme -Raw } else { "" }

        # The ..team versions for adam and arthur are richer (have book listings).
        # The old versions are just stubs. Only overwrite if ..team is a stub too.
        if ($oldContent -eq $newContent) {
            Write-Host "  ${agent}: README.md identical, no action needed"
        } elseif ($newContent -match "## Books") {
            # The ..team version has book listings — it's the richer version, keep it
            Write-Host "  ${agent}: ..team README is richer (has book listings), keeping ..team version"
        } else {
            # The old version and new version differ but neither has book listings
            # Keep the ..team version if it exists; they're likely equivalent stubs
            Write-Host "  ${agent}: Both are stubs, keeping ..team version"
        }
    }
}

Write-Host ""
Write-Host "=== Step 6: Delete old agent directories ==="

$oldAgents = @("adam", "arthur", "cathy", "david", "libby", "phillip", "queenie")
foreach ($agent in $oldAgents) {
    $oldDir = Join-Path $libraryRoot $agent
    if (Test-Path $oldDir) {
        Write-Host "  Removing: $oldDir"
        Remove-Item -Path $oldDir -Recurse -Force
    } else {
        Write-Host "  Already gone: $oldDir"
    }
}

Write-Host ""
Write-Host "=== Done! ==="
Write-Host ""
Write-Host "Final structure check:"
Get-ChildItem -Path $libraryRoot -Directory -Force | Select-Object Name | Format-Table -AutoSize
