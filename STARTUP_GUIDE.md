# 🚀 Website Startup Guide

Your website can be started in multiple ways. Choose whichever is easiest for you!

---

## ⚡ Method 1: Double-Click Batch File (Easiest)

### Windows Users - Simply Double-Click:
```
start.bat
```

**What it does:**
1. ✅ Checks if `.env` is configured
2. ✅ Installs frontend dependencies (if needed)
3. ✅ Installs backend dependencies (if needed)
4. ✅ Opens browser automatically
5. ✅ Starts frontend (port 8080)
6. ✅ Starts backend (port 5000)

**Result:** Your website opens at http://localhost:8080

---

## ⚡ Method 2: PowerShell Script

### Windows PowerShell Users:
```powershell
.\start.ps1
```

**Advantages:**
- Better error handling
- Cleaner output
- Color-coded messages
- More reliable on modern Windows

**Note:** If you get a permission error, run this first:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then run: `.\start.ps1`

---

## ⚡ Method 3: npm Commands

### From Command Line / Terminal:

**Install dependencies (one-time):**
```bash
npm run install:all
```

**Start everything:**
```bash
npm run dev:all
```

**Result:** Starts at http://localhost:8080

---

## ⚡ Method 4: Manual Control (Advanced)

### Terminal 1 - Frontend:
```bash
cd frontend
npm run dev
```

### Terminal 2 - Backend:
```bash
cd backend
npm run dev
```

**Result:**
- Frontend: http://localhost:8080
- Backend: http://localhost:5000

---

## 🎯 What Happens After Starting

### Automatic Actions:
1. ✅ Browser opens to http://localhost:8080
2. ✅ Frontend loads with hot-reload enabled
3. ✅ Backend API starts accepting requests
4. ✅ Email service ready to send bookings

### Manual Actions:
1. Scroll to "Book a Table" section
2. Fill in booking details
3. Submit form
4. Check email for booking confirmation

---

## ✅ Signs It's Working

### Frontend (8080)
- Website loads
- No red errors
- Page reloads when you save code

### Backend (5000)
- Terminal shows "Server running on..."
- No error messages
- Ready to accept API requests

### Email Service
- When form submitted, backend logs show "Email sent"
- Check inbox for booking confirmation

---

## 🛑 How to Stop

**Press in the terminal:**
```
Ctrl + C
```

You'll see: `^C` in the terminal

Then confirm to exit (press `Y` if asked)

---

## ⚠️ Before First Run - Required Setup

### 1. Gmail Configuration Required
Edit `.env` file:
```
GMAIL_USER=surtiafzal915@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
```

[How to get App Password?](EMAIL_SETUP.md)

### 2. Node.js Required
Make sure you have Node.js installed:
```bash
node --version
npm --version
```

Should show version numbers (v16+ and 8+)

---

## 🔧 Troubleshooting

### "npm command not found"
- Install Node.js from https://nodejs.org/
- Restart terminal after installation

### Port 8080 already in use
- Close other apps using port 8080
- Or change port in `frontend/vite.config.ts`

### Port 5000 already in use
- Close backend process
- Or change `PORT` in `.env`

### ".env file not found"
- Copy `.env.example` to `.env`
- Add your Gmail App Password
- Save the file

### "npm install fails"
- Run: `npm audit fix`
- Then try again: `npm run dev:all`

---

## 📊 Ports & URLs

| Service | Port | URL |
|---------|------|-----|
| Frontend | 8080 | http://localhost:8080 |
| Backend | 5000 | http://localhost:5000 |
| Email | SMTP | Gmail servers |

---

## 💾 First-Time Installation

The scripts automatically handle this:

```bash
start.bat  # or .\start.ps1  # or: npm run install:all
```

This installs:
- 📦 Frontend dependencies (React, Vite, etc.)
- 📦 Backend dependencies (Express, Nodemailer, etc.)
- ⚙️ All required tools

Takes ~2-3 minutes on first run.

---

## 🎯 Recommended Workflow

1. **First time:**
   ```bash
   start.bat
   ```
   (Installs everything automatically)

2. **Daily development:**
   ```bash
   start.bat
   ```
   (Takes only 10 seconds after first run)

3. **Add dependencies:**
   ```bash
   cd frontend  # or cd backend
   npm install package-name
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🚀 File Overview

| File | Purpose |
|------|---------|
| `start.bat` | Windows batch starter (easiest!) |
| `start.ps1` | PowerShell starter (advanced) |
| `.env` | Configuration (Gmail settings) |
| `package.json` | Root scripts manager |
| `frontend/` | React website |
| `backend/` | Express API |

---

## ✨ Quick Reference

### Start Website
```bash
start.bat           # Easiest - just double-click or run this
.\start.ps1         # PowerShell version
npm run dev:all     # Manual npm command
```

### View Websites
```
http://localhost:8080       # Your website
http://localhost:5000       # API server (not for browsing)
```

### Stop Everything
```bash
Ctrl + C            # In the terminal
```

### Troubleshoot
```bash
npm run install:all         # Reinstall all deps
npm audit fix               # Fix security issues
```

---

## 💡 Tips

✨ **Code changes auto-reload** - Save file, browser updates instantly
✨ **Keep terminal open** - It shows backend activity and errors
✨ **Check F12 console** - Shows frontend errors
✨ **Check terminal logs** - Shows backend errors
✨ **Clear cache** - Ctrl+Shift+R in browser if needed

---

## 🎉 You're Ready!

```bash
start.bat
```

Then visit: http://localhost:8080

**That's it!** Your website is running! 🚀
