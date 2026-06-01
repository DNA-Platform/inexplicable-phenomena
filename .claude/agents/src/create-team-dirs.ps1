$base = "c:\Source\dna-platform\inexplicable-phenomena\.claude\team\library\..team"
New-Item -ItemType Directory -Path $base -Force | Out-Null

@('arthur','adam','libby','cathy','david','phillip','queenie','gabby') | ForEach-Object {
    New-Item -ItemType Directory -Path "$base\$_" -Force | Out-Null
    Write-Output "Created ..team/$_"
}
