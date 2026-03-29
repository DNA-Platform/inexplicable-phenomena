<#
.SYNOPSIS
    CDP Spike: Launch Claude Desktop with Chrome DevTools Protocol enabled.

.DESCRIPTION
    Claude Desktop is Electron 40.4.1, MSIX packaged (Claude_pzs8sxrjxfjjc).

    === RESULT: CDP IS BLOCKED BY ELECTRON FUSES ===

    Anthropic has disabled the following Electron fuses in Claude.exe:
      - EnableNodeCliInspectArguments: DISABLED  (blocks --remote-debugging-port)
      - RunAsNode: DISABLED                       (blocks ELECTRON_RUN_AS_NODE)
      - EnableNodeOptionsEnvironmentVariable: DISABLED (blocks NODE_OPTIONS)

    Fuses are baked into the binary at build time. They cannot be overridden
    by env vars, CLI args, or config files.

    Read fuses: npx @electron/fuses read --app "<path-to-Claude.exe>"

    Additionally, the MSIX package creates two more obstacles:
      1. Direct exe launch fails (process dies without MSIX activation context)
      2. MSIX activation (shell:AppsFolder\...) ignores arbitrary CLI args
      3. User-level env vars don't propagate into the MSIX container

    === ALTERNATIVE: DEVELOPER MODE ===

    Claude Desktop has a built-in Developer Mode that sets allowDevTools=true
    in developer_settings.json (in the userData directory). When enabled:
      - An "Inspect Element" menu item appears in the context menu
      - DevTools can be opened in detached mode via the Help menu
      - This gives DOM access without needing CDP

    The developer_settings.json path (inside MSIX virtual filesystem):
      C:\Users\<user>\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\developer_settings.json

    To enable: create/edit that file with: {"allowDevTools": true}
    Or: use Help > Enable Developer Mode in the Claude Desktop menu bar.

    With DevTools open, you CAN run JS against the renderer. But this requires
    the window to be visible (DevTools attaches to the focused webContents).

    === APPROACHES IF CDP IS TRULY NEEDED ===

    a. FLIP THE FUSE (most promising):
       Copy the entire app dir somewhere writable, flip the fuse:
         npx @electron/fuses write --app "path/to/copied/Claude.exe" EnableNodeCliInspectArguments=on
       Then launch the modified binary with --remote-debugging-port=9222.
       Complications: MSIX signature invalid, need the full app directory
       structure, and OnlyLoadAppFromAsar fuse is on.

    b. MSIX REPACKAGE: Extract MSIX, flip fuses, re-sign with dev cert,
       reinstall. Heavy but deterministic.

    c. NON-MSIX INSTALL: Use a plain .exe installer if available.
       Fuses would still need flipping.

    === KEY PATHS ===

    Exe:       C:\Program Files\WindowsApps\Claude_1.1.5749.0_x64__pzs8sxrjxfjjc\app\Claude.exe
    App asar:  C:\Program Files\WindowsApps\Claude_1.1.5749.0_x64__pzs8sxrjxfjjc\app\resources\app.asar
    User data: C:\Users\<user>\AppData\Local\Packages\Claude_pzs8sxrjxfjjc\LocalCache\Roaming\Claude\
    Config:    <userData>\claude_desktop_config.json
    Dev mode:  <userData>\developer_settings.json

.PARAMETER Port
    CDP port. Default: 9222.

.EXAMPLE
    .\cdp-launch.ps1
#>
param(
    [int]$Port = 9222
)

$ErrorActionPreference = "Stop"

# --- Find Claude Desktop ---
$pkg = Get-AppxPackage *claude*
if (-not $pkg) {
    Write-Error "Claude Desktop MSIX package not found"
    return
}

$ClaudeExe = Join-Path $pkg.InstallLocation "app\Claude.exe"
$ClaudePackageFamily = $pkg.PackageFamilyName

Write-Host "Claude Desktop exe: $ClaudeExe"
Write-Host "Package family: $ClaudePackageFamily"
Write-Host "Electron version: 40.4.1 (from process command lines)"
Write-Host ""

# --- Check Electron fuses ---
Write-Host "=== Electron Fuses ==="
$fuseOutput = & npx @electron/fuses read --app $ClaudeExe 2>&1
Write-Host $fuseOutput
Write-Host ""

$cliInspectDisabled = $fuseOutput -match "EnableNodeCliInspectArguments is Disabled"
if ($cliInspectDisabled) {
    Write-Host "BLOCKER: EnableNodeCliInspectArguments fuse is DISABLED."
    Write-Host "CDP cannot be enabled via CLI flags or env vars."
    Write-Host ""
    Write-Host "To proceed, you would need to:"
    Write-Host "  1. Copy the app directory to a writable location"
    Write-Host "  2. Flip the fuse: npx @electron/fuses write --app <path> EnableNodeCliInspectArguments=on"
    Write-Host "  3. Launch the modified binary with --remote-debugging-port=$Port"
    Write-Host ""
    Write-Host "=== Checking Developer Mode alternative ==="

    $userDataPath = Join-Path $env:LOCALAPPDATA "Packages\$($pkg.PackageFamilyName)\LocalCache\Roaming\Claude"
    $devSettingsPath = Join-Path $userDataPath "developer_settings.json"

    if (Test-Path $devSettingsPath) {
        $settings = Get-Content $devSettingsPath -Raw | ConvertFrom-Json
        if ($settings.allowDevTools) {
            Write-Host "Developer Mode is ENABLED ($devSettingsPath)"
            Write-Host "Use Help > Toggle Developer Tools in Claude Desktop to open DevTools."
        } else {
            Write-Host "developer_settings.json exists but allowDevTools is not true."
        }
    } else {
        Write-Host "Developer Mode is NOT enabled."
        Write-Host "To enable: create $devSettingsPath with content:"
        Write-Host '  {"allowDevTools": true}'
        Write-Host "Or use Help > Enable Developer Mode in the Claude Desktop menu."
    }
    return
}

# --- If fuses allow it, try CDP ---
Write-Host "Fuses allow CLI inspect arguments. Attempting CDP launch..."

# Check if already available
try {
    $r = Invoke-WebRequest -Uri "http://localhost:$Port/json/version" -UseBasicParsing -TimeoutSec 2
    Write-Host "CDP ALREADY AVAILABLE on port $Port!"
    Write-Host $r.Content
    return
} catch {}

# Kill existing and relaunch with flag
$existing = Get-Process | Where-Object { $_.Path -like "*WindowsApps*Claude*" }
if ($existing) {
    Write-Host "Killing existing Claude Desktop..."
    $existing | Stop-Process -Force
    Start-Sleep 2
}

# Try direct launch (may fail due to MSIX)
Write-Host "Launching with --remote-debugging-port=$Port..."
$proc = Start-Process -FilePath $ClaudeExe -ArgumentList "--remote-debugging-port=$Port" -PassThru
Start-Sleep 5

if (-not (Get-Process -Id $proc.Id -ErrorAction SilentlyContinue)) {
    Write-Host "Direct launch failed (MSIX activation context required)."
    Write-Host "Falling back to MSIX activation with env var..."

    [Environment]::SetEnvironmentVariable("ELECTRON_ENABLE_REMOTE_DEBUGGING", "$Port", "User")
    Start-Process "shell:AppsFolder\$ClaudePackageFamily!Claude"
    Start-Sleep 5
    [Environment]::SetEnvironmentVariable("ELECTRON_ENABLE_REMOTE_DEBUGGING", $null, "User")
}

# Poll for CDP
$deadline = (Get-Date).AddSeconds(10)
while ((Get-Date) -lt $deadline) {
    Start-Sleep 1
    try {
        $r = Invoke-WebRequest -Uri "http://localhost:$Port/json/version" -UseBasicParsing -TimeoutSec 1
        Write-Host "CDP AVAILABLE on port $Port!"
        Write-Host $r.Content
        return
    } catch {}
}

Write-Host "CDP NOT available after launch attempts."
