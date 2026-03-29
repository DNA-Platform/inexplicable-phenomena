# chat.ps1
# Chat verification and verified send for Claude Desktop.
# Dot-source after desktop.ps1 and config.ps1.
#
# Provides:
#   Assert-CorrectChat   — verify we're on the right conversation, navigate if not
#   Send-VerifiedMessage  — send a message and verify delivery via UIA re-read
#   Test-ClaudeReady      — check if Claude Desktop is accessible
#
# Usage:
#   . "$PSScriptRoot/desktop.ps1"
#   . "$PSScriptRoot/config.ps1"
#   . "$PSScriptRoot/chat.ps1"
#
#   if (Test-ClaudeReady) {
#       Assert-CorrectChat
#       Send-VerifiedMessage "Hello" -NoPrefix
#   }

# ─── Test if Claude Desktop is ready ────────────────────────────────────────

function Test-ClaudeReady {
    $proc = Get-Process -Name 'claude' -ErrorAction SilentlyContinue |
        Where-Object { $_.MainWindowHandle -ne 0 } | Select-Object -First 1
    if (-not $proc) { return $false }

    # Verify UIA can reach it
    $result = Read-ChatContentUIA
    return ($null -ne $result)
}

# ─── Assert correct chat ────────────────────────────────────────────────────
# Checks the current chat URL against $Script:ChatUUID. If on the wrong chat
# and the user does NOT have focus, navigates to the correct one.
# Returns: @{ ok; skipped; reason }

function Assert-CorrectChat {
    if (-not $Script:ChatUUID) {
        return @{ ok = $true; skipped = $false; reason = "no-uuid-configured" }
    }

    $result = Read-ChatContentUIA
    if (-not $result) {
        return @{ ok = $false; skipped = $false; reason = "uia-read-failed" }
    }

    if (-not $result.url) {
        return @{ ok = $true; skipped = $false; reason = "no-url-available" }
    }

    if ($result.url -match $Script:ChatUUID) {
        return @{ ok = $true; skipped = $false; reason = "correct-chat" }
    }

    # Wrong chat — don't navigate, just report. The user controls what chat
    # is open. The listener will idle until the correct chat is showing.
    # (Navigate-ClaudeToChat used Start-Process which opened the browser,
    #  not Claude Desktop. It never worked as intended.)
    return @{ ok = $false; skipped = $true; reason = "wrong-chat" }
}

# ─── Send a verified message ────────────────────────────────────────────────
# Sends a message via Claude Desktop and optionally verifies delivery by
# checking that the message text appears in the UIA content after sending.
#
# Returns: @{ sent; verified; error }

function Send-VerifiedMessage {
    param(
        [Parameter(Mandatory)][string]$Text,
        [switch]$NoVerify,
        [int]$VerifyTimeoutMs = 3000
    )

    $hwnd = Find-ClaudeWindow
    if (-not $hwnd) {
        return @{ sent = $false; verified = $false; error = "Claude Desktop not found" }
    }

    # Check message size
    $sizeCheck = Test-MessageSize $Text
    if (-not $sizeCheck.ok) {
        Write-Warning $sizeCheck.message
    }

    # Save window state for restoration
    $wasMinimized = [WinNative]::IsIconic($hwnd)
    $wasForeground = ([WinNative]::GetForegroundWindow() -eq $hwnd)

    # Focus, send
    Focus-ClaudeWindow $hwnd | Out-Null
    Send-ChatMessage $hwnd $Text

    # Restore window state
    if ($wasMinimized) {
        Minimize-ClaudeWindow $hwnd
    } elseif (-not $wasForeground) {
        [WinNative]::SetWindowPos($hwnd, [IntPtr]::new(1), 0, 0, 0, 0, 0x0013) | Out-Null
        try {
            $caller = Get-Process -Id $PID -ErrorAction SilentlyContinue
            if ($caller -and $caller.MainWindowTitle) {
                [Microsoft.VisualBasic.Interaction]::AppActivate($caller.MainWindowTitle)
            }
        } catch { }
    }

    if ($NoVerify) {
        return @{ sent = $true; verified = $false; error = $null }
    }

    # Verify delivery: check that a marker from the message appears in UIA content
    # Use the first 40 chars of the message (after any prefix) as a marker
    $marker = $Text
    if ($marker.Length -gt 40) { $marker = $marker.Substring(0, 40) }
    # Strip prefix for matching (Dad:, DNA:, etc.)
    $marker = $marker -replace '^(Dad|DNA|Eirian)\s*[>:]?\s*', ''
    $marker = $marker.Trim()
    if ($marker.Length -gt 30) { $marker = $marker.Substring(0, 30) }

    $deadline = [DateTime]::Now.AddMilliseconds($VerifyTimeoutMs)
    while ([DateTime]::Now -lt $deadline) {
        Start-Sleep -Milliseconds 500
        $content = Read-ChatContentUIA
        if ($content -and $content.text -and $content.text.Contains($marker)) {
            return @{ sent = $true; verified = $true; error = $null }
        }
    }

    Write-Warning "Message sent but delivery not verified within ${VerifyTimeoutMs}ms"
    return @{ sent = $true; verified = $false; error = "verification-timeout" }
}

# ─── Send a chunked message ─────────────────────────────────────────────────
# Splits a message on paragraph boundaries and sends each chunk sequentially.
# First chunk keeps the original nametag; subsequent chunks are continuations.
# Used when a message exceeds the safe clipboard limit.

function Send-ChunkedMessage {
    param(
        [Parameter(Mandatory)][string]$Text,
        [int]$ChunkDelayMs = 2000
    )

    $sizeCheck = Test-MessageSize $Text
    if ($sizeCheck.ok) {
        # Under limit — send normally
        return Send-VerifiedMessage -Text $Text -NoVerify
    }

    # Split on paragraph boundaries (double newlines)
    $paragraphs = $Text -split "(\r?\n\s*\r?\n)"
    $chunks = @()
    $current = ""

    foreach ($p in $paragraphs) {
        $candidate = if ($current) { "$current$p" } else { $p }
        $candidateCheck = Test-MessageSize $candidate
        if (-not $candidateCheck.ok -and $current) {
            # Current chunk is full — flush it
            $chunks += $current.TrimEnd()
            $current = $p
        } else {
            $current = $candidate
        }
    }
    if ($current.Trim()) {
        $chunks += $current.TrimEnd()
    }

    # If we couldn't split (single paragraph > limit), send as-is with warning
    if ($chunks.Count -eq 0) {
        Write-Warning "Message too large to chunk on paragraph boundaries. Sending as-is."
        return Send-VerifiedMessage -Text $Text -NoVerify
    }

    Write-Host "[chat] Message chunked into $($chunks.Count) parts"

    $lastResult = $null
    for ($i = 0; $i -lt $chunks.Count; $i++) {
        if ($i -gt 0) {
            Start-Sleep -Milliseconds $ChunkDelayMs
        }
        $lastResult = Send-VerifiedMessage -Text $chunks[$i] -NoVerify
        if (-not $lastResult.sent) {
            Write-Warning "Chunk $($i + 1)/$($chunks.Count) failed: $($lastResult.error)"
            return $lastResult
        }
    }

    return $lastResult
}
