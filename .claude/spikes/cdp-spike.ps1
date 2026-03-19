<#
.SYNOPSIS
    CDP spike: connect to Claude Desktop via Chrome DevTools Protocol,
    enumerate targets, and read conversation DOM content.

.DESCRIPTION
    Assumes Claude Desktop is running with --remote-debugging-port=9222.
    See cdp-launch.ps1 for how to achieve that (spoiler: it's hard with MSIX).

    This script:
    1. Lists available CDP targets
    2. Connects to the main page via websocket
    3. Evaluates JS to find and extract conversation content
    4. All without focusing the window

    STATUS: The CDP connection code below is READY but UNTESTED because we
    cannot currently launch Claude Desktop with CDP enabled (see cdp-launch.ps1).

.PARAMETER Port
    CDP port. Default: 9222.

.PARAMETER ListOnly
    Just list targets, don't connect.

.EXAMPLE
    .\cdp-spike.ps1
    .\cdp-spike.ps1 -ListOnly
    .\cdp-spike.ps1 -Port 9223
#>
param(
    [int]$Port = 9222,
    [switch]$ListOnly
)

$ErrorActionPreference = "Stop"

# --- Step 1: Check CDP is available ---
Write-Host "Checking CDP on port $Port..."
try {
    $version = Invoke-RestMethod -Uri "http://localhost:$Port/json/version" -TimeoutSec 3
    Write-Host "Connected to: $($version.Browser)"
    Write-Host "Protocol: $($version.'Protocol-Version')"
    Write-Host "WebSocket URL: $($version.webSocketDebuggerUrl)"
} catch {
    Write-Error "CDP not available on port $Port. Launch Claude Desktop with --remote-debugging-port=$Port first."
    return
}

# --- Step 2: List targets ---
Write-Host ""
Write-Host "=== CDP Targets ==="
$targets = Invoke-RestMethod -Uri "http://localhost:$Port/json" -TimeoutSec 3
foreach ($t in $targets) {
    Write-Host "  [$($t.type)] $($t.title) - $($t.url)"
    Write-Host "    WS: $($t.webSocketDebuggerUrl)"
}

if ($ListOnly) { return }

# --- Step 3: Pick the main page target ---
# Claude Desktop's main view is likely the renderer with the conversation UI
# Look for a target with type "page" and a relevant URL (not devtools, not blank)
$pageTarget = $targets | Where-Object {
    $_.type -eq "page" -and
    $_.url -notlike "devtools://*" -and
    $_.url -ne "about:blank" -and
    $_.url -ne ""
} | Select-Object -First 1

if (-not $pageTarget) {
    # Fall back to any page
    $pageTarget = $targets | Where-Object { $_.type -eq "page" } | Select-Object -First 1
}

if (-not $pageTarget) {
    Write-Error "No suitable page target found"
    return
}

Write-Host ""
Write-Host "Selected target: [$($pageTarget.type)] $($pageTarget.title)"
Write-Host "  URL: $($pageTarget.url)"

# --- Step 4: Connect via WebSocket ---
$wsUrl = $pageTarget.webSocketDebuggerUrl
Write-Host ""
Write-Host "Connecting to WebSocket: $wsUrl"

# Use .NET ClientWebSocket for the CDP connection
$ws = [System.Net.WebSockets.ClientWebSocket]::new()
$cts = [System.Threading.CancellationTokenSource]::new(10000) # 10s timeout

try {
    $ws.ConnectAsync([Uri]$wsUrl, $cts.Token).GetAwaiter().GetResult()
    Write-Host "WebSocket connected!"
} catch {
    Write-Error "WebSocket connection failed: $_"
    return
}

# Helper: send CDP command and receive response
function Send-CDPCommand {
    param(
        [System.Net.WebSockets.ClientWebSocket]$WebSocket,
        [int]$Id,
        [string]$Method,
        [hashtable]$Params = @{}
    )

    $cmd = @{
        id     = $Id
        method = $Method
        params = $Params
    } | ConvertTo-Json -Depth 10 -Compress

    $bytes = [System.Text.Encoding]::UTF8.GetBytes($cmd)
    $segment = [ArraySegment[byte]]::new($bytes)
    $cancelToken = [System.Threading.CancellationToken]::None

    $WebSocket.SendAsync($segment, [System.Net.WebSockets.WebSocketMessageType]::Text, $true, $cancelToken).GetAwaiter().GetResult()

    # Receive response
    $buffer = [byte[]]::new(1048576) # 1MB buffer
    $result = $WebSocket.ReceiveAsync([ArraySegment[byte]]::new($buffer), $cancelToken).GetAwaiter().GetResult()

    $responseText = [System.Text.Encoding]::UTF8.GetString($buffer, 0, $result.Count)

    # Handle fragmented messages
    while (-not $result.EndOfMessage) {
        $result = $WebSocket.ReceiveAsync([ArraySegment[byte]]::new($buffer), $cancelToken).GetAwaiter().GetResult()
        $responseText += [System.Text.Encoding]::UTF8.GetString($buffer, 0, $result.Count)
    }

    return $responseText | ConvertFrom-Json
}

# --- Step 5: Explore the DOM ---
Write-Host ""
Write-Host "=== DOM Exploration ==="

# First: get document structure overview
$cmdId = 1

# Try to find message elements using various selectors
# Claude Desktop is a React app - messages likely use data-testid or role attributes
$selectors = @(
    # Likely selectors for Claude Desktop conversation UI
    '[data-testid]'
    '[role="log"]'
    '[role="article"]'
    '.prose'
    '[class*="message"]'
    '[class*="Message"]'
    '[class*="conversation"]'
    '[class*="Conversation"]'
    '[class*="chat"]'
    '[class*="Chat"]'
    '[data-role]'
    '[data-message-id]'
)

Write-Host "Probing DOM with selectors..."
foreach ($sel in $selectors) {
    $js = "(() => { const els = document.querySelectorAll('$sel'); return { selector: '$sel', count: els.length, samples: Array.from(els).slice(0, 3).map(e => ({ tag: e.tagName, id: e.id, classes: e.className?.toString().substring(0, 100), testid: e.dataset?.testid, text: e.textContent?.substring(0, 80) })) }; })()"

    $resp = Send-CDPCommand -WebSocket $ws -Id ($cmdId++) -Method "Runtime.evaluate" -Params @{
        expression    = $js
        returnByValue = $true
    }

    if ($resp.result.result.value.count -gt 0) {
        $val = $resp.result.result.value
        Write-Host ""
        Write-Host "FOUND: $($val.selector) -> $($val.count) elements"
        foreach ($s in $val.samples) {
            Write-Host "  <$($s.tag) id='$($s.id)' class='$($s.classes)' data-testid='$($s.testid)'>"
            Write-Host "    text: $($s.text)"
        }
    }
}

# --- Step 6: Extract full conversation text ---
Write-Host ""
Write-Host "=== Conversation Text ==="

# Try multiple strategies to get conversation content
$extractJs = @"
(() => {
    // Strategy 1: Look for message containers with data-testid
    let messages = document.querySelectorAll('[data-testid*="message"]');
    if (messages.length === 0) {
        // Strategy 2: Look for elements with role attributes
        messages = document.querySelectorAll('[role="article"], [role="log"] > *');
    }
    if (messages.length === 0) {
        // Strategy 3: Look for prose/markdown rendered content
        messages = document.querySelectorAll('.prose, [class*="markdown"]');
    }
    if (messages.length === 0) {
        // Strategy 4: Get the main content area and extract text blocks
        const main = document.querySelector('main, [role="main"], #root > div > div');
        if (main) {
            return {
                strategy: 'main-content',
                text: main.innerText.substring(0, 10000),
                html: main.innerHTML.substring(0, 2000)
            };
        }
    }

    return {
        strategy: messages.length > 0 ? 'message-elements' : 'none',
        count: messages.length,
        messages: Array.from(messages).map((m, i) => ({
            index: i,
            role: m.dataset?.role || m.getAttribute('role') || 'unknown',
            text: m.innerText?.substring(0, 500),
            classes: m.className?.toString().substring(0, 100)
        }))
    };
})()
"@

$resp = Send-CDPCommand -WebSocket $ws -Id ($cmdId++) -Method "Runtime.evaluate" -Params @{
    expression    = $extractJs
    returnByValue = $true
}

if ($resp.result.result.value) {
    $val = $resp.result.result.value
    Write-Host "Strategy: $($val.strategy)"
    Write-Host "Messages found: $($val.count)"

    if ($val.messages) {
        foreach ($m in $val.messages) {
            Write-Host ""
            Write-Host "--- Message $($m.index) [$($m.role)] ---"
            Write-Host $m.text
        }
    }
    elseif ($val.text) {
        Write-Host ""
        Write-Host "--- Main content ---"
        Write-Host $val.text
    }
}
else {
    Write-Host "No result from DOM extraction"
    Write-Host "Raw response:"
    $resp | ConvertTo-Json -Depth 5
}

# --- Step 7: Get full page tree for analysis ---
Write-Host ""
Write-Host "=== DOM Tree Overview ==="

$treeJs = @"
(() => {
    function walk(el, depth) {
        if (depth > 4) return '';
        const indent = '  '.repeat(depth);
        const tag = el.tagName?.toLowerCase() || '?';
        const id = el.id ? '#' + el.id : '';
        const cls = el.className?.toString ? '.' + el.className.toString().split(' ').slice(0, 2).join('.') : '';
        const testid = el.dataset?.testid ? ' [' + el.dataset.testid + ']' : '';
        let line = indent + '<' + tag + id + cls + testid + '>';
        if (el.children.length === 0) {
            const t = el.textContent?.trim();
            if (t) line += ' ' + t.substring(0, 60);
        }
        let result = line + '\n';
        for (const child of el.children) {
            result += walk(child, depth + 1);
        }
        return result;
    }
    return walk(document.body, 0).substring(0, 5000);
})()
"@

$resp = Send-CDPCommand -WebSocket $ws -Id ($cmdId++) -Method "Runtime.evaluate" -Params @{
    expression    = $treeJs
    returnByValue = $true
}

if ($resp.result.result.value) {
    Write-Host $resp.result.result.value
}

# --- Cleanup ---
$ws.CloseAsync(
    [System.Net.WebSockets.WebSocketCloseStatus]::NormalClosure,
    "done",
    [System.Threading.CancellationToken]::None
).GetAwaiter().GetResult()

Write-Host ""
Write-Host "=== Done ==="
Write-Host "WebSocket closed."
