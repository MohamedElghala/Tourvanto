@echo off
title Push Tourvanto to GitHub
echo ===================================================
echo   Push Tourvanto Repository to GitHub
echo ===================================================
echo.
echo Please enter your GitHub Repository URL.
echo Example: https://github.com/your-username/Tourvanto.git
echo.
set /p REPO_URL="Repository URL: "

if "%REPO_URL%"=="" (
    echo [X] Error: URL cannot be empty.
    pause
    exit /b 1
)

echo.
echo [*] Linking to remote repository...
git remote remove origin 2>nul
git remote add origin %REPO_URL%
git branch -M main

echo [*] Pushing code to GitHub...
git push -u origin main

echo.
echo ===================================================
echo   Code pushed successfully!
echo   Now go to Vercel.com and import this repository.
echo ===================================================
pause
