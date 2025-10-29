@echo off
echo 🚀 Starting HypeVest development environment...

REM Start relayer in new window
echo 📡 Starting relayer server...
start "HypeVest Relayer" cmd /k "cd relayer && npm run dev"

REM Wait a moment for relayer to start
timeout /t 3 /nobreak >nul

REM Start frontend in new window
echo 🌐 Starting frontend server...
start "HypeVest Frontend" cmd /k "cd frontend && npm run dev"

echo ✅ Development environment started!
echo.
echo 📡 Relayer: http://localhost:3001
echo 🌐 Frontend: http://localhost:3000
echo.
echo Both servers are running in separate windows.
echo Close the windows to stop the servers.

