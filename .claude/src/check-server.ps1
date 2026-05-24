Start-Sleep -Seconds 5
try {
    $r = Invoke-WebRequest -Uri 'http://localhost:5199' -UseBasicParsing -TimeoutSec 3
    Write-Output "Server ready: $($r.StatusCode)"
} catch {
    Write-Output "Error: $($_.Exception.Message)"
}
