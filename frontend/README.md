# Nordic Table Design - Frontend

React + Vite + TypeScript frontend for restaurant booking website.

## 🚀 Quick Start

### Development
```bash
npm run dev
```
Runs at `http://localhost:8080`

### Build
```bash
npm run build
```

### Production Preview
```bash
npm run preview
```

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## 📂 Project Structure

```
src/
├── components/
│   ├── Booking.tsx           # Table booking form with email integration
│   ├── About.tsx
│   ├── Contact.tsx
│   ├── Gallery.tsx
│   └── ...other components
├── services/
│   └── bookingService.ts     # API client for backend
├── context/
│   └── LanguageContext.tsx   # Multi-language support
├── hooks/
│   └── use-mobile.tsx
├── i18n/
│   └── translations.ts
├── lib/
│   └── utils.ts
├── pages/
├── test/
├── App.tsx                   # Main app component
└── main.tsx                  # Entry point

public/               # Static assets
index.html           # HTML template
```

## 🎨 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Router** - Routing
- **React Hook Form** - Form handling
- **Lucide React** - Icons

## 📧 Booking System

The booking form (`src/components/Booking.tsx`) integrates with the backend API to send emails.

### How it works:
1. User fills booking form
2. Form submitted to backend API: `POST /api/send-booking`
3. Backend sends email via Gmail
4. User sees success message

### Services
- `src/services/bookingService.ts` - API client that communicates with backend

## 🔧 Configuration

### Environment Variables
Create `.env.local`:
```
VITE_API_URL=http://localhost:5000
```

### Vite Configuration
`vite.config.ts` includes:
- API proxy to backend (`/api` → `http://localhost:5000`)
- Path alias (`@` → `./src`)
- Component tagger for development

## 🛠️ Components

### Notable Components
- **Booking.tsx** - Table booking form with email submission
- **Navbar.tsx** - Navigation bar
- **Hero.tsx** - Hero section
- **Gallery.tsx** - Photo gallery
- **Contact.tsx** - Contact section
- **Reviews.tsx** - Customer reviews
- **ui/** - Reusable UI components (from shadcn/ui)

## 🌍 Internationalization

Multi-language support via `LanguageContext`:
- English
- Other languages defined in `src/i18n/translations.ts`

## 🧪 Testing

Uses Vitest for unit tests:
```bash
npm run test        # Run tests once
npm run test:watch  # Watch mode
```

## 🚀 Building for Production

```bash
npm run build
```

Creates `dist/` folder ready for deployment to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting

## 🔗 Integration

### Backend Communication
- API Base: `http://localhost:5000` (or `VITE_API_URL`)
- Endpoint: `POST /api/send-booking`
- See `src/services/bookingService.ts` for details

## 📦 Dependencies

See `package.json` for full list. Key dependencies:
- react@^18.3.1
- react-router-dom@^6.30.1
- react-hook-form@^7.61.1
- @radix-ui/react-* (component primitives)
- tailwindcss@^3.4.17
- vite@^5.4.19

## ❓ Troubleshooting

### Backend connection fails
- Ensure backend running on port 5000
- Check `VITE_API_URL` in `.env.local`
- Check browser console for errors

### Tailwind styles not applied
- Restart dev server
- Check `tailwind.config.ts`
- Verify CSS imports in components

### Port 8080 in use
- Update `vite.config.ts` server port
- Or kill process using port 8080

## 🔄 From Project Root

Run from `nordic-table-design/`:
```bash
npm run dev              # Start frontend only
npm run dev:all          # Start frontend + backend
cd frontend && npm run dev  # Manual start
```

---

**Frontend ready to go!** 🎉
