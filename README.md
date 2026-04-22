
# Qabeli Restaurang – Restaurant Website

Welcome to **Qabeli Restaurang**, a modern, elegant full‑stack restaurant website featuring an online booking system, real menu images, and smooth hero animations.

---

## 🌟 Features

### ✨ Modern Design & UX

- Responsive, mobile‑first interface (optimised for phones, tablets, and desktops).
- Smooth CSS‑based hero animations (background scale, fade‑up text, floating logo).
- Nordic‑inspired dark theme with warm gold accents.
- Floating booking button, back‑to‑top button, and chatbot entry point for quick actions.

### 🍽️ Restaurant Experience

- Hero section with restaurant showcase and animated intro.
- Featured dishes and highlight sections.
- Full menu sections with structured content.
- Gallery with food and ambience images.
- Catering service information.
- Lunch buffet details.
- Customer reviews and testimonials.
- Contact information with location, hours, and phone.

### 📱 Online Booking System

- Easy‑to‑use reservation form.
- Real‑time email confirmations to the customer.
- Admin/restaurant email notifications for each booking.
- Form validation and error handling.
- Responsive booking interface that works across devices.

### 🚀 Performance

- Fast development and build with **Vite**.
- Optimised bundle size for production.
- Smooth, low‑latency user experience on Vercel.

---

## 🚀 Getting Started

### Quick Start (Recommended)

> Requires **Node.js v18 or higher** and `npm` or `yarn`.

#### Windows

Use the helper scripts:

```bash
start.bat
Or in PowerShell:

bash
.\start.ps1
Manual Startup
Terminal 1 – Backend:

bash
cd backend
npm install
npm run dev
Backend API default: http://localhost:5000

Terminal 2 – Frontend:

bash
cd frontend
npm install
npm run dev
Frontend default: http://localhost:3000 (or as configured)

🌐 Deployment
This project is designed to be deployable in a few minutes.

Frontend: Vercel (FREE)

Backend: Railway (FREE tier with monthly credit, or similar Node hosting)

Key docs in the repo:

QUICK_DEPLOY.md – minimal “deploy in 5 minutes” guide.

DEPLOYMENT.md – full deployment and configuration guide.

Cost: Typically $0 for most restaurants on free tiers.
Auto‑deploy: Every git push to the configured branch automatically redeploys the site on Vercel.

🔧 Configuration
Email Setup (Important)
The restaurant receives booking notifications via email and customers get confirmation emails.

Create or edit the .env file in the project root:

bash
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
Get your Gmail App Password:

Enable 2‑Step Verification on your Google account.

Go to: https://myaccount.google.com/apppasswords

Generate a 16‑character app password.

Paste it as GMAIL_APP_PASSWORD in .env.

The backend (backend/server.ts) uses these values via Nodemailer to send booking emails securely.

📁 Project Structure
text
nordic-table-design/
├── frontend/              # React website (Vite + TS + Tailwind + shadcn/ui)
│   ├── src/
│   │   ├── components/    # UI components (Hero, Menu, Gallery, Booking, etc.)
│   │   ├── pages/         # Page components (Index, NotFound)
│   │   ├── App.tsx        # Main app: providers + router
│   │   └── index.css      # Global styles + hero animations
│   └── package.json
├── backend/               # Express API server
│   ├── server.ts          # Booking API endpoint + email notifications
│   └── package.json
├── .env                   # Configuration (email settings, never committed)
├── start.bat              # Windows startup script (frontend + backend)
└── start.ps1              # PowerShell startup script
🎯 Website Sections
Section	Purpose
Hero	Animated, eye‑catching restaurant introduction
Featured Dishes	Spotlight on popular dishes
Menu	Complete dining options
Gallery	Food & ambience photography
Reviews	Customer testimonials
Booking	Table reservation system
Catering	Catering services information
Lunch Buffet	Lunch buffet details
Contact	Location, hours, phone, and email
💻 Tech Stack
Frontend
React 18 (with react-router-dom for routing)

TypeScript

Tailwind CSS

shadcn/ui component library

Vite (development + build)

Custom CSS animations for hero and micro‑interactions

Backend
Express.js (TypeScript)

Nodemailer (email service)

CORS enabled

Environment‑based configuration via .env

📧 Booking Flow
When a customer submits a booking:

The frontend posts booking data to the backend API.

The backend:

Sends a confirmation email to the customer.

Sends a detailed booking notification to the restaurant email.

The frontend displays a success message or validation errors.

Email templates are HTML‑based and pre‑filled with booking details.

For debugging:

Run npm run dev in the backend folder and check the server logs.

Open browser DevTools (F12) and inspect network requests and console output.

🎨 Customisation
You can easily adapt this project for any restaurant:

Restaurant Info:
Edit frontend/src/data/restaurant.ts (name, address, hours, etc.).

Menu Items & Content:
Update components in frontend/src/components/ (menu sections, featured dishes, texts).

Styling & Theme:
Modify tailwind.config.ts and design tokens in frontend/src/index.css.

Email Templates:
Edit the HTML emails in backend/server.ts.

Animations:
Adjust hero animations and other motion effects in frontend/src/index.css and components (e.g. Hero.tsx).

🖼 Menu Images
The printed Qabeli Restaurang menu is included as images so the site can show the real menu pages.

Location:

frontend/public/menu/

Files:

menu-1-starters.jpg – Förrätter (starters)

menu-2-rice-dishes.jpg – RISRÄTTER (rice dishes)

menu-3-grill.jpg – GRILLRÄTTER (grill dishes)

menu-4-special.jpg – SPECIAL MENY

menu-5-desserts.jpg – EFTERRÄTTER

In the frontend, they are referenced as static assets from the public folder, for example:

xml
<img src="/menu/menu-1-starters.jpg" alt="Förrätter – Qabeli Restaurang" />
🔒 Security
Email credentials are stored only in .env and never committed to git.

CORS is configured for controlled frontend–backend communication.

Booking forms include validation on both client and server.

📞 Support / Troubleshooting
If you run into issues:

Check backend logs with:

bash
cd backend
npm run dev
Open browser console (F12) and inspect errors or failed requests.

Verify your .env email configuration and that Gmail app passwords are set correctly.

Confirm that the frontend and backend URLs match in your deployment configuration.

📜 License
Private project – All rights reserved.
Built with ❤️ for Qabeli Restaurang.

