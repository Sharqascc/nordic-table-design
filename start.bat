@echo off
REM Nordic Table Design - Website Launcher
REM This script automatically starts the entire website

setlocal enabledelayedexpansion
cd /d "%~dp0"

echo.
echo ================================================
echo   Nordic Table Design - Website Starter
echo ================================================
echo.

REM Check if .env exists
if not exist ".env" (
    echo [ERROR] .env file not found!
    echo.
    echo Please copy .env.example to .env and add your Gmail App Password:
    echo   GMAIL_APP_PASSWORD=your_16_char_password
    echo.
    pause
    exit /b 1
)

echo [✓] Configuration file found

REM Check if frontend node_modules exist
if not exist "frontend\node_modules" (
    echo.
    echo [INFO] Installing frontend dependencies...
    cd frontend
    call npm install
    cd ..
    if errorlevel 1 (
        echo [ERROR] Failed to install frontend dependencies
        pause
        exit /b 1
    )
)

REM Check if backend node_modules exist
if not exist "backend\node_modules" (
    echo.
    echo [INFO] Installing backend dependencies...
    cd backend
    call npm install
    cd ..
    if errorlevel 1 (
        echo [ERROR] Failed to install backend dependencies
        pause
        exit /b 1
    )
)

echo [✓] All dependencies installed

echo.
echo ================================================
echo   Starting your website...
echo ================================================
echo.
echo Frontend URL:  http://localhost:8080
echo Backend API:   http://localhost:5000
echo.
echo [INFO] Opening browser in 2 seconds...
timeout /t 2 /nobreak

REM Try to open browser
start http://localhost:8080 2>nul

echo.
echo [✓] Website starting!
echo.
echo The frontend and backend are now running.
echo The browser should open automatically.
echo.
echo IMPORTANT: Keep this window open while using the website!
echo.
echo To stop: Press Ctrl+C
echo.

npm run dev:all

pause
