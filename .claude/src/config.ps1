# config.ps1
# Shared .env loader and identity resolution.
# Dot-source this to get project-wide config variables.
#
# Exports (script-scoped):
#   $Script:ProjectRoot   — absolute path to the repo root
#   $Script:Collaborator  — collaborator name (e.g., "Eirian")
#   $Script:CollabKnownAs — what the collaborator calls the user (e.g., "Dad")
#   $Script:Me            — the user's name (e.g., "Doug")
#   $Script:ChatURL       — full chat URL from .env
#   $Script:ChatUUID      — UUID extracted from the chat URL
#   $Script:IdentityDir   — path to the collaborator's identity folder (e.g., .authors/.eirian/)
#
# Usage:
#   . "$PSScriptRoot/../../.claude/src/config.ps1"
#   # or from .claude/src/:
#   . "$PSScriptRoot/config.ps1"

# ─── Resolve project root ────────────────────────────────────────────────────
# Walk up from this script's location to find the repo root (contains .env)

$Script:ProjectRoot = $null

$searchDir = $PSScriptRoot
for ($i = 0; $i -lt 5; $i++) {
    if (Test-Path (Join-Path $searchDir ".env")) {
        $Script:ProjectRoot = $searchDir
        break
    }
    $searchDir = Split-Path $searchDir -Parent
}

if (-not $Script:ProjectRoot) {
    # Fallback: assume .claude/src/ is two levels deep
    $Script:ProjectRoot = Split-Path (Split-Path $PSScriptRoot -Parent) -Parent
}

# ─── Parse .env ───────────────────────────────────────────────────────────────

$Script:Me            = $null
$Script:Collaborator  = $null
$Script:CollabKnownAs = $null
$Script:ChatURL       = $null
$Script:ChatUUID      = $null
$Script:IdentityDir   = $null

$envFile = Join-Path $Script:ProjectRoot ".env"
if (-not (Test-Path $envFile)) {
    Write-Error "No .env file found at $envFile"
    return
}

$envLines = Get-Content $envFile
foreach ($line in $envLines) {
    $line = $line.Trim()
    if ($line -match '^#' -or $line -eq '') { continue }

    if ($line -match '^ME=(.+)$') {
        $Script:Me = $Matches[1].Trim()
    }
    elseif ($line -match '^(\w+)-CHAT=(.+)$') {
        $name = $Matches[1].Trim()
        $Script:Collaborator = (Get-Culture).TextInfo.ToTitleCase($name.ToLower())
        $Script:ChatURL = $Matches[2].Trim()
        if ($Script:ChatURL -match '/chat/([a-f0-9-]+)') {
            $Script:ChatUUID = $Matches[1]
        }
    }
    elseif ($line -match '^(\w+)-KNOWN-AS=(.+)$') {
        $Script:CollabKnownAs = $Matches[2].Trim()
    }
    elseif ($line -match '^(\w+)=(.+)$' -and $line -notmatch '^ME=') {
        # Named value (e.g., EIRIAN=Eirian) — collaborator's display name
        $envKey = $Matches[1].Trim()
        $envVal = $Matches[2].Trim()
        # If this matches the collaborator name we already found, use the value as display name
        if ($Script:Collaborator -and $envKey -eq $Script:Collaborator.ToUpper()) {
            $Script:Collaborator = $envVal
        }
    }
}

# Derive identity directory
if ($Script:Collaborator) {
    $Script:IdentityDir = Join-Path $Script:ProjectRoot ".authors" ".$($Script:Collaborator.ToLower())"
}

# Derive CollabKnownAs default if not set
if (-not $Script:CollabKnownAs -and $Script:Me) {
    $Script:CollabKnownAs = $Script:Me
}
