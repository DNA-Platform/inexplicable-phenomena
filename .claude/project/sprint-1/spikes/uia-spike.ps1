#Requires -Version 5.1
<#
.SYNOPSIS
    UIA Spike -- Read Claude Desktop's accessibility tree WITHOUT focusing the window.

.DESCRIPTION
    Uses Windows UI Automation (UIA) to find the Claude Desktop window,
    walk its accessibility tree, and report what elements and patterns are available.

    CRITICAL: This script must NEVER call SetFocus, SetForegroundWindow, or any
    method that activates/focuses the Claude window.

.PARAMETER MaxDepth
    Maximum tree depth to walk (default 12)

.PARAMETER MaxElements
    Maximum elements to enumerate (default 500)

.PARAMETER TextOnly
    Only output the TextPattern content from the main conversation document

.PARAMETER ConversationOnly
    Walk only the conversation area, not the full UI chrome
#>

param(
    [int]$MaxDepth = 12,
    [int]$MaxElements = 500,
    [switch]$TextOnly,
    [switch]$ConversationOnly
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

# -- Load UIA assemblies --
if (-not $TextOnly) {
    Write-Host "`n=== UIA Spike: Claude Desktop Accessibility Tree ===" -ForegroundColor Cyan
    Write-Host "Timestamp: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
}

try {
    Add-Type -AssemblyName UIAutomationClient
    Add-Type -AssemblyName UIAutomationTypes
    if (-not $TextOnly) { Write-Host "[OK] UIA assemblies loaded" -ForegroundColor Green }
} catch {
    Write-Host "[FAIL] Could not load UIA assemblies: $_" -ForegroundColor Red
    exit 1
}

$uia = [System.Windows.Automation.AutomationElement]

# -- Find Claude Desktop window --
if (-not $TextOnly) { Write-Host "`n--- Finding Claude Desktop Window ---" -ForegroundColor Yellow }

$claudeProcesses = Get-Process -Name 'claude' -ErrorAction SilentlyContinue
if (-not $claudeProcesses) {
    Write-Host "[WARN] Claude Desktop is NOT running." -ForegroundColor Red
    exit 0
}

$mainProc = $claudeProcesses | Where-Object { $_.MainWindowHandle -ne 0 } | Select-Object -First 1

$claudeWindow = $null

# Strategy 1: FromHandle (fastest)
if ($mainProc -and $mainProc.MainWindowHandle -ne 0) {
    try {
        $claudeWindow = $uia::FromHandle($mainProc.MainWindowHandle)
        if (-not $TextOnly) {
            Write-Host "[OK] Window found via FromHandle: '$($claudeWindow.Current.Name)'" -ForegroundColor Green
            Write-Host "     PID=$($mainProc.Id) Class=$($claudeWindow.Current.ClassName)"
        }
    } catch {
        if (-not $TextOnly) { Write-Host "  FromHandle failed: $_" }
    }
}

# Strategy 2: Search by PID
if (-not $claudeWindow) {
    $root = $uia::RootElement
    foreach ($proc in $claudeProcesses) {
        $condition = New-Object System.Windows.Automation.PropertyCondition(
            $uia::ProcessIdProperty, $proc.Id
        )
        $found = $root.FindAll([System.Windows.Automation.TreeScope]::Children, $condition)
        if ($found.Count -gt 0) {
            $claudeWindow = $found[0]
            break
        }
    }
}

# Strategy 3: Search by name
if (-not $claudeWindow) {
    $root = $uia::RootElement
    $allWindows = $root.FindAll(
        [System.Windows.Automation.TreeScope]::Children,
        [System.Windows.Automation.Condition]::TrueCondition
    )
    foreach ($win in $allWindows) {
        if ($win.Current.Name -eq 'Claude') {
            $claudeWindow = $win
            break
        }
    }
}

if (-not $claudeWindow) {
    Write-Host "[FAIL] Claude Desktop window not found." -ForegroundColor Red
    Write-Host ""
    Write-Host "When Claude Desktop is minimized to system tray, it destroys the"
    Write-Host "BrowserWindow. No HWND exists, so UIA cannot read it."
    Write-Host "The window must exist (can be behind other windows, just not in tray)."
    exit 1
}

# -- Find the main conversation Document element --
$andCondition = New-Object System.Windows.Automation.AndCondition(
    (New-Object System.Windows.Automation.PropertyCondition(
        $uia::ControlTypeProperty,
        [System.Windows.Automation.ControlType]::Document
    )),
    (New-Object System.Windows.Automation.PropertyCondition(
        $uia::AutomationIdProperty,
        'RootWebArea'
    ))
)

$documents = $claudeWindow.FindAll(
    [System.Windows.Automation.TreeScope]::Descendants,
    $andCondition
)

# Find the named document (the main app, not the blank first one)
$mainDoc = $null
foreach ($doc in $documents) {
    if ($doc.Current.Name -eq 'Claude') {
        $mainDoc = $doc
        break
    }
}
if (-not $mainDoc -and $documents.Count -gt 0) {
    $mainDoc = $documents[$documents.Count - 1]
}

# -- TextOnly mode: just dump the TextPattern content --
if ($TextOnly) {
    if (-not $mainDoc) {
        Write-Host "(no document found)"
        exit 1
    }
    $tp = $null
    if ($mainDoc.TryGetCurrentPattern([System.Windows.Automation.TextPattern]::Pattern, [ref]$tp)) {
        $text = $tp.DocumentRange.GetText(-1)
        Write-Host $text
    } else {
        Write-Host "(no TextPattern on document)"
        exit 1
    }
    exit 0
}

# -- Full exploration mode --
Write-Host "`n--- Window Properties ---" -ForegroundColor Yellow
Write-Host "  Name: $($claudeWindow.Current.Name)"
Write-Host "  ClassName: $($claudeWindow.Current.ClassName)"
Write-Host "  BoundingRectangle: $($claudeWindow.Current.BoundingRectangle)"
Write-Host "  PID: $($claudeWindow.Current.ProcessId)"

# -- Pattern catalog --
$patternDefs = @(
    @{ Name = "TextPattern";       Id = [System.Windows.Automation.TextPattern]::Pattern }
    @{ Name = "ValuePattern";      Id = [System.Windows.Automation.ValuePattern]::Pattern }
    @{ Name = "ScrollPattern";     Id = [System.Windows.Automation.ScrollPattern]::Pattern }
    @{ Name = "WindowPattern";     Id = [System.Windows.Automation.WindowPattern]::Pattern }
    @{ Name = "TransformPattern";  Id = [System.Windows.Automation.TransformPattern]::Pattern }
    @{ Name = "SelectionPattern";  Id = [System.Windows.Automation.SelectionPattern]::Pattern }
    @{ Name = "ExpandCollapsePattern"; Id = [System.Windows.Automation.ExpandCollapsePattern]::Pattern }
    @{ Name = "InvokePattern";     Id = [System.Windows.Automation.InvokePattern]::Pattern }
    @{ Name = "TogglePattern";     Id = [System.Windows.Automation.TogglePattern]::Pattern }
    @{ Name = "RangeValuePattern"; Id = [System.Windows.Automation.RangeValuePattern]::Pattern }
)

# -- Document elements --
Write-Host "`n--- Document Elements (RootWebArea) ---" -ForegroundColor Yellow
foreach ($doc in $documents) {
    Write-Host "  Document: Name='$($doc.Current.Name)'" -ForegroundColor White

    foreach ($pd in $patternDefs) {
        $p = $null
        if ($doc.TryGetCurrentPattern($pd.Id, [ref]$p)) {
            Write-Host "    [YES] $($pd.Name)" -ForegroundColor Green
            if ($pd.Name -eq 'TextPattern') {
                $text = $p.DocumentRange.GetText(500)
                $display = if ($text.Length -gt 300) { $text.Substring(0, 297) + "..." } else { $text }
                Write-Host "    Content preview: $display" -ForegroundColor Cyan
            }
            if ($pd.Name -eq 'ValuePattern') {
                Write-Host "    Value (URL): $($p.Current.Value)" -ForegroundColor Cyan
            }
        }
    }
    Write-Host ""
}

# -- Text elements --
Write-Host "--- Text Elements ---" -ForegroundColor Yellow
$textCondition = New-Object System.Windows.Automation.PropertyCondition(
    $uia::ControlTypeProperty, [System.Windows.Automation.ControlType]::Text
)
$texts = $claudeWindow.FindAll([System.Windows.Automation.TreeScope]::Descendants, $textCondition)
Write-Host "  Count: $($texts.Count)"
foreach ($t in $texts) {
    $name = $t.Current.Name
    if ($name -and $name.Length -gt 100) { $name = $name.Substring(0, 97) + "..." }
    if ($name -and $name.Trim()) {
        Write-Host "    '$name'" -ForegroundColor Gray
    }
}

# -- Edit elements --
Write-Host "`n--- Edit Elements ---" -ForegroundColor Yellow
$editCondition = New-Object System.Windows.Automation.PropertyCondition(
    $uia::ControlTypeProperty, [System.Windows.Automation.ControlType]::Edit
)
$edits = $claudeWindow.FindAll([System.Windows.Automation.TreeScope]::Descendants, $editCondition)
Write-Host "  Count: $($edits.Count)"
foreach ($e in $edits) {
    Write-Host "    Edit: Name='$($e.Current.Name)' Class='$($e.Current.ClassName)'" -ForegroundColor Gray
    $vp = $null
    if ($e.TryGetCurrentPattern([System.Windows.Automation.ValuePattern]::Pattern, [ref]$vp)) {
        Write-Host "      ValuePattern: '$($vp.Current.Value)'" -ForegroundColor Cyan
    }
}

# -- Walk the tree if not ConversationOnly --
if (-not $ConversationOnly -and $mainDoc) {
    Write-Host "`n--- Walking conversation tree (RawViewWalker) ---" -ForegroundColor Yellow
    $walker = [System.Windows.Automation.TreeWalker]::RawViewWalker
    $script:count = 0

    function Walk-Content {
        param($node, $depth, $indent)
        if ($depth -gt $MaxDepth -or $script:count -ge $MaxElements) { return }
        $script:count++

        try {
            $ct = $node.Current.ControlType.ProgrammaticName
            $name = $node.Current.Name
            $class = $node.Current.ClassName

            $displayName = if ($name -and $name.Length -gt 80) { $name.Substring(0,77) + "..." } else { $name }

            # Only show elements with names or at shallow depth
            $show = ($name -and $name.Trim()) -or ($ct -match 'Text|Document|Edit|List|Heading') -or ($depth -le 2)
            if ($show) {
                $classShort = if ($class -and $class.Length -gt 40) { $class.Substring(0,37) + "..." } else { $class }
                Write-Host "${indent}[$ct] Name='$displayName' Class='$classShort'"
            }
        } catch { return }

        $child = $walker.GetFirstChild($node)
        while ($child -and $script:count -lt $MaxElements) {
            Walk-Content $child ($depth + 1) ($indent + '  ')
            $child = $walker.GetNextSibling($child)
        }
    }

    Walk-Content $mainDoc 0 ''
    Write-Host "  (walked $($script:count) elements)"
}

# -- Full text dump --
if ($mainDoc) {
    Write-Host "`n--- Full TextPattern Content ---" -ForegroundColor Yellow
    $tp = $null
    if ($mainDoc.TryGetCurrentPattern([System.Windows.Automation.TextPattern]::Pattern, [ref]$tp)) {
        $fullText = $tp.DocumentRange.GetText(10000)
        Write-Host $fullText -ForegroundColor Cyan
    } else {
        Write-Host "  (no TextPattern available)"
    }
}

# -- Summary --
Write-Host "`n" -NoNewline
Write-Host ("=" * 60) -ForegroundColor Cyan
Write-Host "=== ASSESSMENT ===" -ForegroundColor Cyan
Write-Host ("=" * 60) -ForegroundColor Cyan
Write-Host ""
Write-Host "Focus safety: NO focus/activation calls were made." -ForegroundColor Green
Write-Host ""
Write-Host "Findings:" -ForegroundColor Yellow
Write-Host "  1. Claude Desktop (Electron/Chrome_WidgetWin_1) exposes UIA tree"
Write-Host "  2. RawViewWalker needed (FindAll with Children misses web content)"
Write-Host "  3. Document elements with AutomationId='RootWebArea' contain web content"
Write-Host "  4. TextPattern on Document element gives full text (no focus needed)"
Write-Host "  5. ValuePattern on Document gives current URL"
Write-Host "  6. Text/Edit elements expose individual UI labels and input fields"
Write-Host "  7. Edit element (class 'tiptap ProseMirror') is the chat input box"
Write-Host ""
Write-Host "Limitations:" -ForegroundColor Yellow
Write-Host "  1. Window must EXIST -- minimized-to-tray destroys the BrowserWindow"
Write-Host "  2. TextPattern gives flat text, not structured HTML/markdown"
Write-Host "  3. Element Class attributes contain full Tailwind class strings (verbose)"
Write-Host "  4. Tree walk can be slow (50-100ms) if many elements"
Write-Host "  5. No ARIA landmarks/roles exposed in standard UIA properties"
Write-Host ""
Write-Host "=== Spike Complete ===" -ForegroundColor Cyan
