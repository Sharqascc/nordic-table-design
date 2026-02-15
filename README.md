# Nordic Table Design - Restaurant Website

Welcome to **Nordic Table Design**, a modern, elegant restaurant website featuring an online booking system and comprehensive dining experience showcase.

## 🌟 Features

✨ **Modern Design**
- Responsive, mobile-first interface
- Smooth animations and scroll effects
- Professional Nordic-inspired aesthetic

🍽️ **Restaurant Features**
- Hero section with restaurant showcase
- Featured dishes highlighting
- Full menu sections
- Gallery with beautiful food photography
- Catering service information
- Lunch buffet details
- Customer reviews and testimonials
- Contact information

📱 **Online Booking System**
- Easy-to-use reservation form
- Real-time email confirmations
- Admin notifications to restaurant email
- Form validation and error handling
- Responsive booking interface

🚀 **Performance**
- Fast loading with Vite
- Optimized bundle size
- Smooth user experience

---

## 🚀 Getting Started

### Quick Start (Recommended)

**Windows:**
```cmd
start.bat
```

**PowerShell:**
```powershell
.\start.ps1
```

### Manual Startup

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### Access the Website

- **Frontend:** http://localhost:8081
- **Backend API:** http://localhost:5000

---

## 📋 System Requirements

- Node.js v18 or higher
- npm or yarn package manager

---

## 🔧 Configuration

### Email Setup (Important!)

The restaurant receives booking notifications via email. To enable:

1. Open `.env` file in the root directory
2. Set your Gmail credentials:
   ```
   GMAIL_USER=your-email@gmail.com
   GMAIL_APP_PASSWORD=your-app-password
   ```

3. Get your Gmail App Password:
   - Enable 2-Step Verification on your Google Account
   - Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
   - Generate and copy the 16-character password
   - Paste it in `.env`

---

## 📁 Project Structure

```
nordic-table-design/
├── frontend/              # React website
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   └── App.tsx       # Main app
│   └── package.json
├── backend/              # Express API server
│   ├── server.ts         # Booking API endpoint
│   └── package.json
├── .env                  # Configuration (email settings)
├── start.bat             # Windows startup script
└── start.ps1             # PowerShell startup script
```

---

## 🎯 Website Sections

| Section | Purpose |
|---------|---------|
| **Hero** | Eye-catching restaurant introduction |
| **Featured Dishes** | Spotlight on popular menu items |
| **Menu** | Complete dining options |
| **Gallery** | Food & ambiance photography |
| **Reviews** | Customer testimonials |
| **Booking** | Table reservation system |
| **Catering** | Information about catering services |
| **Contact** | Location, hours, phone |

---

## 💻 Tech Stack

**Frontend**
- React 18.3
- TypeScript
- Tailwind CSS
- Vite (build tool)
- shadcn/ui (component library)

**Backend**
- Express.js
- TypeScript
- Nodemailer (email service)
- CORS enabled

---

## 📧 Booking System

When customers book a table:
1. Customer receives a professional confirmation email
2. Restaurant receives a detailed booking notification
3. All information is pre-filled in HTML email templates
4. Success message shown to user

---

## 🔒 Security

- Email credentials stored securely in `.env` (never committed to Git)
- CORS configured for frontend-backend communication
- Form validation on both client and server

---

## 📞 Support

For issues or questions:
- Check backend logs `npm run dev` in backend folder
- Open browser console with F12
- Verify email configuration in `.env`

---

## 🎨 Customization

To customize the restaurant details:

1. **Restaurant Info:** Edit `frontend/src/data/restaurant.ts`
2. **Menu Items:** Update components in `frontend/src/components/`
3. **Styling:** Modify `tailwind.config.ts`
4. **Email Templates:** Edit HTML in `backend/server.ts`

---

## 📜 License

Private project - All rights reserved

---

**Built with ❤️ for Nordic Table Design Restaurant**

