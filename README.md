# Nordic Table Design - Restaurant Website

A modern restaurant website built with React + TypeScript + Tailwind CSS, featuring an integrated email booking system with Express.js backend.

## 🎯 Features

✅ Modern, responsive restaurant website
✅ Email-based table booking system
✅ Multi-language support
✅ Professional booking confirmation emails
✅ Admin email notifications
✅ Beautiful UI with shadcn/ui components
✅ Monorepo structure (frontend + backend)

## 📁 Project Structure

This is a **monorepo** with separate `frontend` and `backend` folders:

```
nordic-table-design/
├── frontend/              # React + Vite frontend
├── backend/               # Express.js backend with email service
├── package.json           # Root monorepo config
├── .env                   # Backend environment (Gmail config)
├── start.bat              # Quick start script
└── MONOREPO_STRUCTURE.md  # Detailed structure guide
```

For detailed structure, see [MONOREPO_STRUCTURE.md](MONOREPO_STRUCTURE.md)

## 🚀 Quick Start

### 1. Setup Email (One-time only)

Edit `.env` in the root directory:
```env
GMAIL_USER=surtiafzal915@gmail.com
GMAIL_APP_PASSWORD=your_16_char_password
```

[See EMAIL_SETUP.md](EMAIL_SETUP.md) for detailed instructions

### 2. Install Dependencies

```bash
npm run install:all
```

### 3. Start Everything

**Option A: Windows batch script**
```bash
start.bat
```

**Option B: npm command**
```bash
npm run dev:all
```

### 4. Open in Browser

- Frontend: http://localhost:8080
- Backend: http://localhost:5000

## 🛠️ Available Commands

**From project root:**
```bash
npm run dev              # Start frontend only
npm run dev:backend      # Start backend only  
npm run dev:all          # Start both (recommended)
npm run build            # Build frontend
npm run lint             # Lint frontend
npm run test             # Run frontend tests
npm run install:all      # Install all dependencies
```

**Frontend only:**
```bash
cd frontend
npm run dev              # Development server
npm run build            # Production build
npm run lint             # Run ESLint
npm run test             # Run tests
```

**Backend only:**
```bash
cd backend
npm run dev              # Development server
npm run build            # Build TypeScript
```

## 📧 Email Booking System

When a user books a table:

1. ✅ Form submitted to backend API
2. ✅ Data validated on server
3. ✅ Professional email sent to restaurant
4. ✅ Confirmation email sent to customer
5. ✅ Success message shown to user

### Email Subject Format
```
New Table Booking - {name} on {date} at {time}
```

### API Endpoint
```
POST /api/send-booking
```

See [backend/README.md](backend/README.md) for API details

## 🔧 Technology Stack

### Frontend
- React 18.3
- TypeScript
- Vite (build tool)
- Tailwind CSS
- shadcn/ui
- React Router
- React Hook Form

### Backend
- Express.js
- Nodemailer (Gmail)
- TypeScript
- CORS
- dotenv

## 📂 Folder Overview

### Frontend (`frontend/`)
- React components and pages
- Email booking form
- Multi-language support
- Vite configuration
- See [frontend/README.md](frontend/README.md)

### Backend (`backend/`)
- Express.js API server
- Nodemailer email service
- Gmail integration
- See [backend/README.md](backend/README.md)

## 🔐 Environment Variables

### Root `.env` (Backend)
```env
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_16_char_password
FRONTEND_URL=http://localhost:8080
PORT=5000
NODE_ENV=development
```

### Frontend `.env.local`
```env
VITE_API_URL=http://localhost:5000
```

## 📖 Documentation

- [MONOREPO_STRUCTURE.md](MONOREPO_STRUCTURE.md) - Project structure guide
- [EMAIL_SETUP.md](EMAIL_SETUP.md) - Email configuration guide
- [BOOKING_SYSTEM_READY.md](BOOKING_SYSTEM_READY.md) - System overview
- [frontend/README.md](frontend/README.md) - Frontend details
- [backend/README.md](backend/README.md) - Backend details

## 🚀 Deployment

### Frontend
```bash
cd frontend
npm run build
# Upload 'dist' folder to Vercel, Netlify, etc.
```

### Backend
```bash
cd backend
npm run build
# Deploy to Heroku, Railway, Render, etc.
```

## ❓ Troubleshooting

### Backend Connection Issues
- Ensure backend running: `npm run dev:backend`
- Check if `VITE_API_URL` matches backend URL
- Open browser console (F12) for errors

### Email Not Sending
- Verify `.env` has correct App Password
- Enable 2-step verification on Gmail
- Check backend logs for errors

### Port Already in Use
- Edit `.env` to change `PORT`
- Update `VITE_API_URL` to match

See [MONOREPO_STRUCTURE.md](MONOREPO_STRUCTURE.md#troubleshooting) for more solutions

## 🔄 Git Workflow

```bash
# Clone
git clone <YOUR_GIT_URL>
cd nordic-table-design

# Install all dependencies
npm run install:all

# Start development
npm run dev:all

# Make changes and commit
git add .
git commit -m "Your message"
git push
```

## 📦 Node.js & npm

Required:
- Node.js 18+ 
- npm 8+

Check versions:
```bash
node --version
npm --version
```

## 🎨 UI Components

Uses shadcn/ui components:
- Buttons, inputs, forms
- Dialogs, modals
- Cards, badges
- Dropdowns, popovers
- And more...

Customized with Tailwind CSS

## 🌐 Multi-Language Support

Currently supports multiple languages via `LanguageContext`:
- English
- Additional languages in `src/i18n/translations.ts`

## 📝 Additional Notes

- `.env` is gitignored (never committed)
- Each folder has its own `node_modules`
- Frontend proxies API calls to backend
- All commands run from project root
- TypeScript provides type safety

## 🤝 Support

For issues:
1. Check the relevant README (frontend/backend)
2. Review [EMAIL_SETUP.md](EMAIL_SETUP.md)
3. Check [MONOREPO_STRUCTURE.md](MONOREPO_STRUCTURE.md)
4. Review error messages in logs

## ✨ Next Steps

1. ✅ Configure email in `.env`
2. ✅ Run `npm run install:all`
3. ✅ Run `npm run dev:all`
4. ✅ Open `http://localhost:8080`
5. ✅ Test the booking form
6. ✅ Check email inbox

---

**Happy coding! 🚀**

