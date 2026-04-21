text
# Qabeli Restaurang - Restaurant Website

Welcome to **Qabeli Restaurang**, a modern, elegant restaurant website featuring an online booking system and comprehensive dining experience showcase.

---

## 🌟 Features

### ✨ Modern Design
- Responsive, mobile-first interface  
- Smooth animations and scroll effects  
- Professional Nordic-inspired aesthetic  

### 🍽️ Restaurant Features
- Hero section with restaurant showcase  
- Featured dishes highlighting  
- Full menu sections  
- Gallery with beautiful food photography  
- Catering service information  
- Lunch buffet details  
- Customer reviews and testimonials  
- Contact information  

### 📱 Online Booking System
- Easy-to-use reservation form  
- Real-time email confirmations  
- Admin notifications to restaurant email  
- Form validation and error handling  
- Responsive booking interface  

### 🚀 Performance
- Fast loading with Vite  
- Optimized bundle size  
- Smooth user experience  

---

## 🚀 Getting Started

### Quick Start (Recommended)

**Windows:**

```bash
start.bat
PowerShell:

bash
.\start.ps1
Manual Startup
Terminal 1 - Backend:

bash
cd backend
npm run dev
Terminal 2 - Frontend:

bash
cd frontend
npm run dev
Access the Website
Frontend: http://localhost:8081

Backend API: http://localhost:5000

🌐 Deployment
Ready to put your restaurant online?

📖 QUICK_DEPLOY.md – Deploy in 5 minutes

📖 DEPLOYMENT.md – Complete deployment guide

Services Used:

Frontend: Vercel (FREE)

Backend: Railway (FREE $5/month credit)

Cost: $0 for most restaurants

Auto-deploy: Every git push updates your site

📋 System Requirements
Node.js v18 or higher

npm or yarn package manager

🔧 Configuration
Email Setup (Important!)
The restaurant receives booking notifications via email. To enable:

Create or edit the .env file in the root directory

Set your Gmail credentials:

bash
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password
Get your Gmail App Password:

Enable 2-Step Verification on your Google Account

Go to https://myaccount.google.com/apppasswords

Generate and copy the 16-character password

Paste it in .env

📁 Project Structure
text
nordic-table-design/
├── frontend/            # React website
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   └── App.tsx      # Main app
│   └── package.json
├── backend/             # Express API server
│   ├── server.ts        # Booking API endpoint
│   └── package.json
├── .env                 # Configuration (email settings)
├── start.bat            # Windows startup script
└── start.ps1            # PowerShell startup script
🎯 Website Sections
Section	Purpose
Hero	Eye-catching restaurant introduction
Featured Dishes	Spotlight on popular menu items
Menu	Complete dining options
Gallery	Food & ambiance photography
Reviews	Customer testimonials
Booking	Table reservation system
Catering	Information about catering services
Contact	Location, hours, phone
💻 Tech Stack
Frontend
React 18.3

TypeScript

Tailwind CSS

Vite (build tool)

shadcn/ui (component library)

Backend
Express.js

TypeScript

Nodemailer (email service)

CORS enabled

📧 Booking System
When customers book a table:

Customer receives a professional confirmation email

Restaurant receives a detailed booking notification

All information is pre-filled in HTML email templates

Success message shown to user

🔒 Security
Email credentials stored securely in .env (never committed to Git)

CORS configured for frontend-backend communication

Form validation on both client and server

📞 Support
For issues or questions:

Check backend logs with npm run dev in the backend folder

Open browser console with F12

Verify email configuration in .env

🎨 Customization
To customize the restaurant details:

Restaurant Info: Edit frontend/src/data/restaurant.ts

Menu Items: Update components in frontend/src/components/

Styling: Modify tailwind.config.ts

Email Templates: Edit HTML in backend/server.ts

📜 License
Private project – All rights reserved

Built with ❤️ for Qabeli Restaurang



## 🖼 Menu Images

The Qabeli Restaurang printed menu is included as images so the website can show the real menu pages.

Location:

- `frontend/public/menu/`

Files:

- `menu-1-starters.jpg` – Förrätter (starters)
- `menu-2-rice-dishes.jpg` – RISRÄTTER (rice dishes)
- `menu-3-grill.jpg` – GRILLRÄTTER (grill dishes)
- `menu-4-special.jpg` – SPECIAL MENY
- `menu-5-desserts.jpg` – EFTERRÄTTER

In the frontend they are referenced as static assets from the `public` folder, for example:

<img src="/menu/menu-1-starters.jpg" alt="Förrätter – Qabeli Restaurang" />
