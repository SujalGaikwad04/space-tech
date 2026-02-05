@echo off
echo ========================================
echo Testing Backend API Endpoints (FINAL CHECK)
echo ========================================
echo.
echo Waiting 45 seconds for Vercel to redeploy...
timeout /t 45 /nobreak >nul
echo.

echo [1/5] Testing Root Endpoint...
curl -s https://space-tech-l4nokgff3-sujalgaikwad04s-projects.vercel.app/api/
echo.
echo.

echo [2/5] Testing Test Route...
curl -s https://space-tech-l4nokgff3-sujalgaikwad04s-projects.vercel.app/api/test
echo.
echo.

echo [3/5] Testing Health Check...
curl -s https://space-tech-l4nokgff3-sujalgaikwad04s-projects.vercel.app/api/health
echo.
echo.

echo [4/5] Testing Check Email Endpoint...
curl -s https://space-tech-l4nokgff3-sujalgaikwad04s-projects.vercel.app/api/auth/check-email/test@gmail.com
echo.
echo.

echo ========================================
echo Interpretation:
echo.
echo 1. JSON output = SUCCESS! backend is working
echo 2. "Cannot GET /api/..." = Routing Issue (Express not finding path)
echo 3. HTML / Auth Page = Deployment Protection is enabled
echo.
echo If correct, go to https://space-tech-t2yl.vercel.app/Auth and login!
echo.
pause
