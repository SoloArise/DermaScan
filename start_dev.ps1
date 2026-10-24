# Start DermaScan Backend and Frontend in separate windows
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "               Starting DermaScan" -ForegroundColor Cyan
Write-Host "========================================================" -ForegroundColor Cyan

$root = $PSScriptRoot

Write-Host "Launching Backend server (FastAPI on Port 8000)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\backend'; Write-Host '--- DermaScan Backend Server ---' -ForegroundColor Green; python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload"

Write-Host "Launching Frontend server (Vite on Port 5173)..." -ForegroundColor Yellow
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$root\frontend'; Write-Host '--- DermaScan Frontend Server ---' -ForegroundColor Green; npm run dev"

Write-Host ""
Write-Host "--------------------------------------------------------" -ForegroundColor Gray
Write-Host "Both servers have been launched in separate windows!" -ForegroundColor Green
Write-Host "Frontend Web UI : http://localhost:5173" -ForegroundColor Cyan
Write-Host "Backend API Docs: http://127.0.0.1:8000/docs" -ForegroundColor Cyan
Write-Host "Health Check    : http://127.0.0.1:8000/api/v1/health" -ForegroundColor Cyan
Write-Host "--------------------------------------------------------" -ForegroundColor Gray
