@echo off
echo 🚀 Installing HypeVest dependencies...

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v18 or higher.
    exit /b 1
)

REM Check if Rust is installed
cargo --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Rust is not installed. Please install Rust from https://rustup.rs/
    exit /b 1
)

echo ✅ Prerequisites check passed

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
call npm install
cd ..

REM Install relayer dependencies
echo 📦 Installing relayer dependencies...
cd relayer
call npm install
cd ..

REM Build smart contracts
echo 🔨 Building smart contracts...
cd contracts\bond_factory
call cargo build
cd ..\prediction_market
call cargo build
cd ..\..

echo ✅ All dependencies installed successfully!
echo.
echo Next steps:
echo 1. Set up your environment variables (see README.md)
echo 2. Start the relayer: cd relayer ^&^& npm run dev
echo 3. Start the frontend: cd frontend ^&^& npm run dev
echo 4. Set up Linera CLI and deploy contracts

