# Nordic Table Design - Monorepo Structure

This project uses a **monorepo structure** with separate folders for frontend and backend.

## 📁 Project Structure

```
nordic-table-design/
├── frontend/                   # React + Vite frontend application
│   ├── src/                   # React components and logic
│   │   ├── components/        # Reusable React components
│   │   ├── services/          # API services (bookingService.ts)
│   │   ├── context/           # React context (LanguageContext)
│   │   ├── i18n/              # Internationalization
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/               # Utility functions
│   │   ├── pages/             # Page components
│   │   ├── test/              # Tests
│   │   ├── App.tsx            # Main app component
│   │   └── main.tsx           # React entry point
│   ├── public/                # Static assets
│   ├── index.html             # HTML entry point
│   ├── vite.config.ts         # Vite configuration
│   ├── tsconfig.json          # TypeScript config
│   ├── package.json           # Frontend dependencies
│   ├── tailwind.config.ts     # Tailwind CSS config
│   └── .env.local             # Frontend environment variables
│
├── backend/                    # Express.js backend server
│   ├── server.ts              # Main server file with email service
│   ├── package.json           # Backend dependencies
│   ├── tsconfig.json          # TypeScript config
│   └── .gitignore             # Git ignore for backend
│
├── package.json               # Root monorepo package (runs both)
├── .env                       # Backend environment (Gmail config)
├── .env.example               # Example env template
├── start.bat                  # Quick start script (Windows)
├── EMAIL_SETUP.md             # Email setup guide
└── BOOKING_SYSTEM_READY.md    # System documentation
```

## 🚀 Quick Start

### 1. Configure Email (One-time setup)
Edit `.env` file in root:
```
GMAIL_USER=surtiafzal915@gmail.com
GMAIL_APP_PASSWORD=your_16_char_password
```

### 2. Install Dependencies
```bash
npm run install:all
```

### 3. Start Both Servers
```bash
npm run dev:all
```

Or on Windows, double-click:
```
start.bat
```

**Result:**
- Frontend: `http://localhost:8080`
- Backend: `http://localhost:5000`

## 📂 Folder-Specific Commands

### Frontend Only
```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run test     # Run tests
```

### Backend Only
```bash
cd backend
npm run dev      # Start backend server
npm run build    # Build TypeScript
```

## 🔧 Root Commands (From Project Root)

```bash
npm run dev              # Start frontend only
npm run dev:backend      # Start backend only
npm run dev:all          # Start both (recommended)
npm run build            # Build frontend
npm run lint             # Lint frontend
npm run test             # Test frontend
npm run install:all      # Install all dependencies
```

## 📧 Email System

### How It Works
1. User submits booking form on frontend
2. Frontend sends data to backend API (`/api/send-booking`)
3. Backend validates data
4. Nodemailer sends email via Gmail to `surtiafzal915@gmail.com`
5. Customer receives confirmation email

### Email Subject
```
New Table Booking - {name} on {date} at {time}
```

### Files Involved
- **Frontend:** `src/services/bookingService.ts` - API client
- **Frontend:** `src/components/Booking.tsx` - Form component
- **Backend:** `backend/server.ts` - Email API endpoint

## 🔒 Environment Variables

### Root `.env` (Backend/Email)
```
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=your_16_char_password
FRONTEND_URL=http://localhost:8080
PORT=5000
NODE_ENV=development
```

### Frontend `.env.local`
```
VITE_API_URL=http://localhost:5000
```

## 🛠️ Troubleshooting

### Port 8080 already in use
Edit `frontend/vite.config.ts` and change port to 8081

### Port 5000 already in use
Edit `.env` and change `PORT=5000` to `PORT=5001`, then update `VITE_API_URL` in `.env.local`

### Frontend can't connect to backend
- Ensure backend is running (`npm run dev:backend`)
- Check if `VITE_API_URL` in `.env.local` matches backend port
- Check browser console (F12) for CORS errors

### Email not being sent
- Verify Gmail 2-step verification is enabled
- Check `.env` has correct App Password
- Ensure `GMAIL_USER` is correct in `.env`
- Check backend logs for errors

## 📦 Dependencies

### Frontend
- React 18.3
- TypeScript
- Vite (build tool)
- Tailwind CSS
- shadcn/ui components
- React Router
- React Hook Form

### Backend
- Express.js
- Nodemailer
- CORS
- TypeScript
- dotenv

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

## 📝 Additional Notes

- `.env` file is gitignored (security)
- Each folder has its own `package.json` and `node_modules`
- Backend uses port 5000, Frontend uses port 8080
- Frontend proxies API calls to backend via Vite config
- All commands run from project root

---

**Project ready for development! 🎉**
