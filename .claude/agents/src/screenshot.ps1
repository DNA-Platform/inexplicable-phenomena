param(
    [string]$Url = "http://localhost:5199",
    [string]$OutDir = "c:\Source\dna-platform\inexplicable-phenomena\.claude\team\perspective\arthur"
)

if (-not (Test-Path $OutDir)) { New-Item -ItemType Directory -Path $OutDir -Force | Out-Null }

$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"
if (-not (Test-Path $chrome)) {
    $chrome = "C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
}

# Desktop screenshot - wait for animations
& $chrome --headless --disable-gpu --screenshot="$OutDir\teaser-desktop.png" --window-size=1440,900 --virtual-time-budget=5000 $Url 2>&1 | Out-Null
Start-Sleep -Seconds 2
Write-Output "Desktop screenshot saved"

# Mobile screenshot - wait for animations
& $chrome --headless --disable-gpu --screenshot="$OutDir\teaser-mobile.png" --window-size=390,844 --virtual-time-budget=5000 $Url 2>&1 | Out-Null
Start-Sleep -Seconds 2
Write-Output "Mobile screenshot saved"
