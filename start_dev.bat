@echo off
title DermaScan Launcher
echo ========================================================
echo               Starting DermaScan
echo ========================================================
echo.
echo Launching Backend server (FastAPI)...
start "DermaScan Backend (Port 8000)" cmd /k "cd /d "%~dp0backend" && python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

echo Launching Frontend server (Vite + React)...
start "DermaScan Frontend (Port 5173)" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo --------------------------------------------------------
echo Both servers have been opened in separate windows!
echo - Frontend Web UI : http://localhost:5173
echo - Backend API Docs: http://127.0.0.1:8000/docs
echo - Health Check    : http://127.0.0.1:8000/api/v1/health
echo --------------------------------------------------------
echo.
pause
