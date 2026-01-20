#!/bin/bash

echo "🚀 Iniciando instalación y configuración..."

# Backend Setup
echo "🔹 Configurando Backend..."
cd backend
if [ ! -d "node_modules" ]; then
    npm install
fi
# Wait for the backend to be ready in background or run in parallel?
# For simplicity in this script, we'll use a tool like concurrently or just run background
echo "🔹 Iniciando Backend..."
npm run start:dev &
BACKEND_PID=$!
cd ..

# Frontend Setup
echo "🔹 Configurando Frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    npm install
fi
echo "🔹 Iniciando Frontend..."
npm run dev &
FRONTEND_PID=$!
cd ..

echo "✅ Aplicación iniciada!"
echo "Backend: http://localhost:3000"
echo "Frontend: http://localhost:5173"
echo "Presiona CTRL+C para detener."

trap "kill $BACKEND_PID $FRONTEND_PID" EXIT

wait
