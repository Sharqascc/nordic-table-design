#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Nordic Table Design - Website Launcher
.DESCRIPTION
    Automatically starts the entire website (frontend + backend)
    with dependency installation if needed.
.EXAMPLE
    .\start.ps1
#>

# Set error action preference
$ErrorActionPreference = "Continue"

# Get script directory
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $ScriptDir

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   Nordic Table Design - Website Starter" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Check if .env exists
if (-not (Test-Path ".env")) {
    Write-Host "[ERROR] .env file not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please copy .env.example to .env and add your Gmail App Password:" -ForegroundColor Yellow
    Write-Host "  GMAIL_APP_PASSWORD=your_16_char_password"
    Write-Host ""
    Write-Host "Or run the batch file and configure it first."
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "[√] Configuration file found" -ForegroundColor Green

# Check and install frontend dependencies
if (-not (Test-Path "frontend\node_modules")) {
    Write-Host ""
    Write-Host "[INFO] Installing frontend dependencies..." -ForegroundColor Yellow
    Push-Location frontend
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to install frontend dependencies" -ForegroundColor Red
        Pop-Location
        Read-Host "Press Enter to exit"
        exit 1
    }
    Pop-Location
}

# Check and install backend dependencies
if (-not (Test-Path "backend\node_modules")) {
    Write-Host "[INFO] Installing backend dependencies..." -ForegroundColor Yellow
    Push-Location backend
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Failed to install backend dependencies" -ForegroundColor Red
        Pop-Location
        Read-Host "Press Enter to exit"
        exit 1
    }
    Pop-Location
}

Write-Host "[√] All dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   Starting your website..." -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Frontend URL:  http://localhost:8080" -ForegroundColor Green
Write-Host "Backend API:   http://localhost:5000" -ForegroundColor Green
Write-Host ""
Write-Host "[INFO] Opening browser in 2 seconds..." -ForegroundColor Yellow
Start-Sleep -Seconds 2

# Try to open browser
try {
    Start-Process "http://localhost:8080"
}
catch {
    Write-Host "[WARNING] Could not open browser automatically" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "[√] Website starting!" -ForegroundColor Green
Write-Host ""
Write-Host "The frontend and backend are now running." -ForegroundColor Cyan
Write-Host "The browser should open automatically." -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANT: Keep this window open while using the website!" -ForegroundColor Yellow
Write-Host ""
Write-Host "To stop: Press Ctrl+C" -ForegroundColor Yellow
Write-Host ""

# Start the servers
npm run dev:all

Read-Host "Press Enter to exit"
