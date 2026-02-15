import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env only in development (on Vercel, use dashboard environment variables)
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: path.resolve(__dirname, '../.env') });
}

const app: Express = express();
const PORT = process.env.PORT || 5000;

// Helper to normalize URL (remove trailing slash)
const normalizeUrl = (url: string) => url.replace(/\/$/, '');

// CORS configuration - accept both with and without trailing slash
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    const frontendUrl = normalizeUrl(process.env.FRONTEND_URL || 'http://localhost:8080');
    const allowedOrigins = [
      frontendUrl,
      'http://localhost:8080',
      'http://localhost:8081',
      'http://localhost:3000',
    ];
    
    if (!origin || allowedOrigins.includes(normalizeUrl(origin))) {
      callback(null, true);
    } else {
      console.warn(`CORS rejected origin: ${origin}`);
      console.warn(`Allowed origins: ${allowedOrigins.join(', ')}`);
      callback(null, true); // Allow anyway for debugging
    }
  },
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle CORS preflight requests
app.options('*', cors(corsOptions));

// Configure Nodemailer with Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // Use App Password, not regular password
  },
});

// Verify connection
transporter.verify((error, success) => {
  if (error) {
    console.error('Email transporter error:', error);
  } else {
    console.log('Email transporter ready:', success);
  }
});

// Booking interface
interface BookingData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  message?: string;
}

// Send booking email
app.post('/api/send-booking', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, date, time, guests, message } = req.body as BookingData;

    // Validation
    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Format the booking date and time for display
    const bookingDate = new Date(date);
    const formattedDate = bookingDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Email HTML template
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #1a1a1a; margin-bottom: 30px; border-bottom: 2px solid #d4a574; padding-bottom: 15px;">
            New Table Booking Request
          </h1>
          
          <div style="margin-bottom: 20px;">
            <h2 style="color: #d4a574; font-size: 16px; margin-bottom: 10px;">Guest Information</h2>
            <p style="margin: 8px 0; color: #333;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 8px 0; color: #333;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 8px 0; color: #333;"><strong>Phone:</strong> ${phone}</p>
          </div>

          <div style="margin-bottom: 20px;">
            <h2 style="color: #d4a574; font-size: 16px; margin-bottom: 10px;">Reservation Details</h2>
            <p style="margin: 8px 0; color: #333;"><strong>Date:</strong> ${formattedDate}</p>
            <p style="margin: 8px 0; color: #333;"><strong>Time:</strong> ${time}</p>
            <p style="margin: 8px 0; color: #333;"><strong>Number of Guests:</strong> ${guests}</p>
          </div>

          ${message ? `
          <div style="margin-bottom: 20px; background-color: #f3f4f6; padding: 15px; border-left: 3px solid #d4a574; border-radius: 4px;">
            <h2 style="color: #d4a574; font-size: 16px; margin-top: 0;">Special Requests</h2>
            <p style="color: #333; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
          ` : ''}

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #666;">
            <p style="margin: 5px 0;">Booking received on: ${new Date().toLocaleString()}</p>
            <p style="margin: 5px 0;">Please confirm this reservation as soon as possible.</p>
          </div>
        </div>
      </div>
    `;

    // Send email to restaurant
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, // Send to restaurant email
      subject: `New Table Booking - ${name} on ${formattedDate} at ${time}`,
      html: emailHtml,
      replyTo: email, // Allow replies to customer email
    };

    await transporter.sendMail(mailOptions);

    // Send confirmation email to customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #1a1a1a; margin-bottom: 20px;">Booking Confirmation</h1>
          
          <p style="color: #333; font-size: 15px; margin-bottom: 20px;">Dear ${name},</p>
          
          <p style="color: #333; font-size: 15px; margin-bottom: 20px;">
            Thank you for your booking request! We have received your reservation for <strong>${guests} guest${guests > 1 ? 's' : ''}</strong> on <strong>${formattedDate} at ${time}</strong>.
          </p>

          <p style="color: #333; font-size: 15px; margin-bottom: 20px;">
            Our team will review your booking and contact you shortly at <strong>${phone}</strong> to confirm your reservation.
          </p>

          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
            <p style="color: #666; font-size: 14px; margin: 0;">
              If you have any questions or need to make changes, please don't hesitate to contact us.
            </p>
          </div>

          <p style="color: #333; font-size: 15px;">We look forward to welcoming you!</p>
          
          <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 15px;">
            This is an automated confirmation email. Please do not reply to this email directly.
          </p>
        </div>
      </div>
    `;

    const customerMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `Booking Confirmation - ${formattedDate} at ${time}`,
      html: customerEmailHtml,
    };

    await transporter.sendMail(customerMailOptions);

    res.json({
      success: true,
      message: 'Booking request submitted successfully!'
    });

  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit booking. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
});

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📧 Email service: ${process.env.GMAIL_USER}`);
});
