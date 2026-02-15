# Nordic Table Design - Backend

Express.js backend server for email-based table booking system.

## 🚀 Quick Start

### Development
```bash
npm run dev
```
Runs at `http://localhost:5000`

### Build
```bash
npm run build
```

## 📋 Available Scripts

- `npm run dev` - Start development server with auto-reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production build

## 📂 Project Structure

```
backend/
├── server.ts          # Main Express server with email service
├── package.json       # Dependencies
├── tsconfig.json      # TypeScript config
└── .gitignore         # Git ignore rules
```

## 🎯 API Endpoint

### POST /api/send-booking

Sends table booking email and customer confirmation.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-234-567-8900",
  "date": "2026-02-15",
  "time": "19:00",
  "guests": 4,
  "message": "Window seat preferred"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Booking request submitted successfully!"
}
```

**Error Response (400/500):**
```json
{
  "success": false,
  "message": "Error description"
}
```

### GET /api/health

Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2026-02-15T10:30:00.000Z"
}
```

## 📧 Email Service

### Configuration

Create `.env` file in root directory:
```
GMAIL_USER=your_email@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
FRONTEND_URL=http://localhost:8080
PORT=5000
NODE_ENV=development
```

### Getting Gmail App Password

1. Enable 2-step verification on Gmail
2. Go to [Google Account Security](https://myaccount.google.com/security)
3. Find **App passwords** (appears only with 2-step verification)
4. Select **Mail** and **Windows Computer**
5. Copy 16-character password
6. Paste in `.env` as `GMAIL_APP_PASSWORD`

### Email Features

✅ Professional HTML email format
✅ Restaurant receives detailed booking notification
✅ Customer receives confirmation email
✅ Auto-formatted dates and times
✅ Reply-to customer email for easy responses

### Email Templates

**Restaurant Email Subject:**
```
New Table Booking - {name} on {date} at {time}
```

**Content includes:**
- Guest information (name, email, phone)
- Reservation details (date, time, guests)
- Special requests/message
- Booking timestamp

**Customer Confirmation:**
- Professional thank you message
- Booking details
- Expected follow-up

## 🛠️ Tech Stack

- **Express.js** - Web framework
- **Nodemailer** - Email service
- **CORS** - Cross-Origin Resource Sharing
- **TypeScript** - Type safety
- **dotenv** - Environment configuration

## 🔧 Server Configuration

### Port
Default: `5000`
Change via `.env` `PORT` variable

### CORS
- Allowed origin: `FRONTEND_URL` from `.env`
- For development: `http://localhost:8080`
- For production: Your domain

### Node Environment
- Development: `NODE_ENV=development`
- Production: `NODE_ENV=production`

## 📤 Dependencies

```json
{
  "express": "^4.18.2",
  "nodemailer": "^6.9.7",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

**Dev Dependencies:**
- TypeScript
- @types packages
- tsx (TypeScript executor)

## 🔒 Security

- ✅ Environment variables for sensitive data
- ✅ CORS restricted to frontend URL
- ✅ Input validation on all endpoints
- ✅ Error messages don't expose system details
- ✅ Gmail App Password (not main password)

## 🚀 Deployment

### Heroku
```bash
heroku create app-name
git push heroku main
```

### Railway/Render
- Push repository
- Set environment variables in dashboard
- Deploy

### AWS/Azure
- Build Docker image or use native support
- Set environment variables
- Deploy

## 🛠️ Troubleshooting

### Email not sending
- Verify `.env` has correct `GMAIL_USER` and `GMAIL_APP_PASSWORD`
- Check Gmail 2-step verification is enabled
- Verify App Password is correct (16 characters)
- Check backend logs for detailed errors

### CORS errors
- Ensure `FRONTEND_URL` in `.env` matches frontend URL
- Check network tab in browser DevTools
- Verify backend is running

### Connection refused
- Ensure backend running: `npm run dev`
- Verify port 5000 is not in use
- Check firewall settings

### TypeScript errors
- Run `npm run build` to check
- Update types: `npm install --save-dev @types/express @types/nodemailer`

## 📝 Development Tips

### View Emails in Development
- Nodemailer logs email output
- Check terminal for email content

### Test Endpoint
```bash
# Health check
curl http://localhost:5000/api/health

# Test booking (use your API client)
POST http://localhost:5000/api/send-booking
```

### Debug Logs
- Server logs all connections
- Email transporter logs verification
- Error stack traces in development mode

## 🔄 From Project Root

Run from `nordic-table-design/`:
```bash
npm run dev:backend      # Start backend only
npm run dev:all          # Start backend + frontend
cd backend && npm run dev # Manual start
```

## 📚 Further Reading

- [Express.js Documentation](https://expressjs.com/)
- [Nodemailer Documentation](https://nodemailer.com/)
- [Gmail App Passwords](https://support.google.com/accounts/answer/185833)

---

**Backend ready to send emails!** 📧
