Write-Host "🚀 Iniciando instalación y configuración..." -ForegroundColor Green

# Backend Setup
Write-Host "🔹 Configurando Backend..." -ForegroundColor Cyan
Push-Location backend
if (-not (Test-Path "node_modules")) {
    npm install
}
Start-Process npm.cmd -ArgumentList "run start:dev" -NoNewWindow
Pop-Location

# Frontend Setup
Write-Host "🔹 Configurando Frontend..." -ForegroundColor Cyan
Push-Location frontend
if (-not (Test-Path "node_modules")) {
    npm.cmd install
}
Start-Process npm.cmd -ArgumentList "run dev" -NoNewWindow
Pop-Location

Write-Host "✅ Aplicación iniciada!" -ForegroundColor Green
Write-Host "Backend: http://localhost:3000"
Write-Host "Frontend: http://localhost:5173"
