$ErrorActionPreference = "SilentlyContinue"

function Stop-Port($port) {
  $pids = @()

  # Preferred on modern Windows PowerShell.
  try {
    $pids = Get-NetTCPConnection -LocalPort $port -State Listen |
      Select-Object -ExpandProperty OwningProcess -Unique
  } catch {
    # Fallback for environments where Get-NetTCPConnection is unavailable.
    $pids = netstat -ano | Select-String "LISTENING\s+(\d+)$" | ForEach-Object {
      $parts = ($_ -replace "^\s+", "") -split "\s+"
      if ($parts.Length -ge 5 -and $parts[1] -match ":$port$") { $parts[-1] }
    } | Where-Object { $_ -match "^\d+$" } | Select-Object -Unique
  }

  if (-not $pids) {
    Write-Host "No process found on port $port" -ForegroundColor DarkYellow
    return
  }

  foreach ($pid in $pids) {
    taskkill /PID $pid /F | Out-Null
    Write-Host "Stopped PID $pid on port $port" -ForegroundColor Green
  }
}

Stop-Port 4001
Stop-Port 5500

Write-Host ""
Write-Host "Done. Backend/frontend ports are now free." -ForegroundColor Cyan
