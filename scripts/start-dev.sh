#!/bin/bash

echo "🚀 Starting HypeVest development environment..."

# Function to kill background processes on exit
cleanup() {
    echo "🛑 Stopping development servers..."
    kill $RELAYER_PID $FRONTEND_PID 2>/dev/null
    exit
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start relayer
echo "📡 Starting relayer server..."
cd relayer
npm run dev &
RELAYER_PID=$!
cd ..

# Wait a moment for relayer to start
sleep 3

# Start frontend
echo "🌐 Starting frontend server..."
cd frontend
npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ Development environment started!"
echo ""
echo "📡 Relayer: http://localhost:3001"
echo "🌐 Frontend: http://localhost:3000"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for background processes
wait

