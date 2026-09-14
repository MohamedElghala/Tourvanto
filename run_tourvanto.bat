@echo off
title Tourvanto - Live Tourism Platform
echo ===================================================
echo   Starting Tourvanto Travel & Excursions Platform...
echo ===================================================
echo.
echo [*] Launching local server on http://localhost:3000
echo [*] Opening in your web browser...
echo.

start http://localhost:3000

node local_server.js

pause
