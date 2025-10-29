#!/bin/bash

echo "🚀 Installing HypeVest dependencies..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v18 or higher."
    exit 1
fi

# Check if Rust is installed
if ! command -v cargo &> /dev/null; then
    echo "❌ Rust is not installed. Please install Rust from https://rustup.rs/"
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
cd ..

# Install relayer dependencies
echo "📦 Installing relayer dependencies..."
cd relayer
npm install
cd ..

# Build smart contracts
echo "🔨 Building smart contracts..."
cd contracts/bond_factory
cargo build
cd ../prediction_market
cargo build
cd ../..

echo "✅ All dependencies installed successfully!"
echo ""
echo "Next steps:"
echo "1. Set up your environment variables (see README.md)"
echo "2. Start the relayer: cd relayer && npm run dev"
echo "3. Start the frontend: cd frontend && npm run dev"
echo "4. Set up Linera CLI and deploy contracts"

