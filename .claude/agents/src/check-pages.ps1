$repo = "DNA-Platform/inexplicable-phenomena"
$base = "https://api.github.com/repos/$repo"

try {
    $pages = Invoke-RestMethod -Uri "$base/pages"
    Write-Output "Pages URL: $($pages.html_url)"
    Write-Output "Status: $($pages.status)"
    Write-Output "Source: $($pages.build_type)"
} catch {
    Write-Output "Error: $($_.Exception.Message)"
}

try {
    $repo_info = Invoke-RestMethod -Uri "$base"
    Write-Output "Homepage field: $($repo_info.homepage)"
    Write-Output "Description: $($repo_info.description)"
} catch {
    Write-Output "Error getting repo info: $($_.Exception.Message)"
}
