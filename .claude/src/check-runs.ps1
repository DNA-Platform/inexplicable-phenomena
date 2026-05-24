$repo = "DNA-Platform/inexplicable-phenomena"
$base = "https://api.github.com/repos/$repo"

$runs = Invoke-RestMethod -Uri "$base/actions/runs?per_page=5"
foreach ($run in $runs.workflow_runs) {
    Write-Output "--- $($run.name) | $($run.status) | $($run.conclusion) | $($run.created_at)"

    if ($run.conclusion -eq "failure") {
        $jobs = Invoke-RestMethod -Uri "$base/actions/runs/$($run.id)/jobs"
        foreach ($job in $jobs.jobs) {
            Write-Output "  Job: $($job.name) | $($job.conclusion)"
            foreach ($step in $job.steps) {
                $mark = if ($step.conclusion -eq "failure") { "FAIL" } else { $step.conclusion }
                Write-Output "    [$mark] $($step.name)"
            }
        }
    }
}
