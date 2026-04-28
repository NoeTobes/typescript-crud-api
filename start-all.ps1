$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path

Write-Host "Starting backend (API) on http://localhost:4001 ..." -ForegroundColor Cyan
Start-Process powershell -WorkingDirectory $projectRoot -ArgumentList "-NoExit", "-Command", "npm run start:dev"

Write-Host "Starting frontend server on http://localhost:5500 ..." -ForegroundColor Cyan
Start-Process powershell -WorkingDirectory $projectRoot -ArgumentList "-NoExit", "-Command", "npm run start:frontend"

Write-Host ""
Write-Host "Both servers launched in separate terminals." -ForegroundColor Green
Write-Host "Frontend URL: http://localhost:5500/frontend/" -ForegroundColor Yellow
Write-Host "Backend URL:  http://localhost:4001" -ForegroundColor Yellow
