🎉 STARTUP SCRIPTS COMPLETE & READY!

═══════════════════════════════════════════════════════════════════

✅ WHAT WAS CREATED

1. Improved start.bat (Windows Batch Script)
   └─ Auto-installs missing dependencies
   └─ Checks configuration
   └─ Opens browser automatically
   └─ Shows clear status messages

2. start.ps1 (PowerShell Script)
   └─ Advanced error handling
   └─ Color-coded output
   └─ Better for troubleshooting

3. STARTUP_GUIDE.md
   └─ Detailed startup documentation
   └─ All methods explained
   └─ Troubleshooting section

4. STARTUP_QUICK_REF.txt
   └─ Quick reference card
   └─ All commands at a glance
   └─ Quick troubleshooting

═══════════════════════════════════════════════════════════════════

🚀 HOW TO START YOUR WEBSITE

From the main folder (d:\nordic-table-design\):

METHOD 1: Windows Batch (Easiest) ⭐
─────────────────────────────────────
Simply double-click:     start.bat

Or run in command prompt: start.bat

✅ What it does:
  • Checks .env configuration
  • Installs frontend dependencies (if needed)
  • Installs backend dependencies (if needed)
  • Starts frontend on port 8080
  • Starts backend on port 5000
  • Opens browser automatically
  • Shows all progress in the terminal


METHOD 2: PowerShell Script
──────────────────────────────
Run in PowerShell:        .\start.ps1

First time only:
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

✅ What it does: (Same as batch but with better error handling)


METHOD 3: npm Commands
──────────────────────────────
Open terminal and run:

npm run dev:all

Or individual commands:
  npm run dev           (Frontend only)
  npm run dev:backend   (Backend only)


METHOD 4: Manual Control (Advanced)
──────────────────────────────────
Terminal 1 - Frontend:
  cd frontend
  npm run dev

Terminal 2 - Backend:
  cd backend
  npm run dev

═══════════════════════════════════════════════════════════════════

⏱️ TIMING

First Run:
  └─ Time: 2-3 minutes
  └─ Why: Installing ~500+ npm packages
  └─ Run once and you're good!

Subsequent Runs:
  └─ Time: 10-15 seconds
  └─ Why: Just starting servers, no installation

═══════════════════════════════════════════════════════════════════

🌐 AFTER STARTUP

Website:     http://localhost:8080  ← Your restaurant website
Backend API: http://localhost:5000  ← API server (internal)

Your browser will automatically open to http://localhost:8080

═══════════════════════════════════════════════════════════════════

✨ AUTO-FEATURES

✅ Automatic Dependency Installation
   If node_modules missing, script installs automatically

✅ Auto-Configuration Check
   Verifies .env file exists before starting

✅ Auto-Browser Open
   Opens http://localhost:8080 automatically

✅ Hot-Reload Development
   Save code → Browser updates instantly
   No need to refresh!

✅ Color-Coded Output
   Easy to spot errors and status messages

✅ Proper Error Messages
   Clear explanation if something's wrong

═══════════════════════════════════════════════════════════════════

📋 FILE LOCATIONS

From main folder:
  start.bat                    ← Windows batch starter
  start.ps1                    ← PowerShell starter
  STARTUP_GUIDE.md            ← Full startup documentation
  STARTUP_QUICK_REF.txt       ← Quick reference
  .env                        ← Configuration (Gmail password)
  frontend/                   ← React website
  backend/                    ← Express API

═══════════════════════════════════════════════════════════════════

🛑 HOW TO STOP

In the terminal window where it's running:

  Press: Ctrl + C

The servers will stop.

═══════════════════════════════════════════════════════════════════

✅ QUICKSTART CHECKLIST

Before first run:
  [ ] Edit .env and add Gmail App Password
  [ ] Have Node.js installed (node --version)
  [ ] Have npm installed (npm --version)

Running:
  [ ] Run start.bat from main folder
  [ ] Wait for browser to open
  [ ] Website loads at http://localhost:8080
  [ ] Test booking form
  [ ] Check email for confirmation

═══════════════════════════════════════════════════════════════════

🎯 YOUR NEXT STEPS

1. Verify .env Has Gmail Password
   Edit: d:\nordic-table-design\.env
   Add: GMAIL_APP_PASSWORD=your_16_char_password
   See: EMAIL_SETUP.md for getting the password

2. Run One of the Startup Scripts
   Double-click: start.bat
   Or run: npm run dev:all

3. Open Your Browser
   Should automatically open to http://localhost:8080
   If not, manually open: http://localhost:8080

4. Test the Booking System
   Fill booking form → Click submit → Check email

═══════════════════════════════════════════════════════════════════

📖 DOCUMENTATION

For more help:
  • STARTUP_GUIDE.md           ← Detailed guide
  • STARTUP_QUICK_REF.txt      ← Quick commands
  • README.md                  ← Project overview
  • EMAIL_SETUP.md             ← Gmail configuration
  • frontend/README.md         ← Frontend details
  • backend/README.md          ← Backend details

═══════════════════════════════════════════════════════════════════

🔧 COMMON ISSUES & FIXES

❌ "npm command not found"
   → Install Node.js: https://nodejs.org/

❌ ".env not found"
   → Copy .env.example to .env
   → Add Gmail App Password

❌ "Port 8080 already in use"
   → Close other programs using port 8080
   → Or change port in frontend/vite.config.ts

❌ "Port 5000 already in use"
   → Close other backend processes
   → Or change PORT in .env

❌ Script doesn't run (PowerShell)
   → Run: Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   → Then: .\start.ps1

═══════════════════════════════════════════════════════════════════

💡 PRO TIPS

✨ Keep terminal open - Shows backend activity and errors
✨ Check F12 console - Shows frontend errors/logs
✨ Save code - Browser auto-reloads (hot reload)
✨ Clear browser cache - Ctrl+Shift+R if needed
✨ Check .env - Most issues due to missing Gmail password

═══════════════════════════════════════════════════════════════════

🎉 YOU'RE ALL SET!

Your website starter scripts are ready to use.

Just run from the main folder:

    start.bat

And your website will start automatically! 🚀

═══════════════════════════════════════════════════════════════════

Need help?
  • See STARTUP_GUIDE.md for detailed instructions
  • See EMAIL_SETUP.md for Gmail configuration
  • Check README.md for project overview
  • Review STARTUP_QUICK_REF.txt for quick commands

═══════════════════════════════════════════════════════════════════
