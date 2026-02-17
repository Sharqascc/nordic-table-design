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
      'https://saffran-peach.vercel.app',
      'https://nordic-table-design.vercel.app',
    ];
    
    if (!origin || allowedOrigins.includes(normalizeUrl(origin))) {
      callback(null, true);
    } else {
      console.warn(`CORS rejected origin: ${origin}`);
      console.warn(`Allowed origins: ${allowedOrigins.join(', ')}`);
      callback(null, true); // Allow anyway for debugging
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
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

// OTP Storage (in production, use a database)
const otpStorage: Map<string, { otp: string; expiresAt: number; bookingData: BookingData }> = new Map();

// Generate 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generate unique OTP ID
function generateOTPID(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Step 1: Generate and send OTP
app.post('/api/generate-otp', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, date, time, guests, message } = req.body as BookingData;

    // Validation
    if (!name || !email || !phone || !date || !time || !guests) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }

    // Validate phone (10 digits)
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length !== 10) {
      return res.status(400).json({
        success: false,
        message: 'Phone number must be exactly 10 digits'
      });
    }

    // Validate date (no past dates)
    const bookingDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (bookingDate < today) {
      return res.status(400).json({
        success: false,
        message: 'Cannot book for past dates'
      });
    }

    // Validate time (10 AM - 10 PM)
    const [hour] = time.split(':').map(Number);
    if (hour < 10 || hour >= 22) {
      return res.status(400).json({
        success: false,
        message: 'Please select a time between 10:00 AM and 10:00 PM'
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpId = generateOTPID();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Store OTP
    otpStorage.set(otpId, { 
      otp, 
      expiresAt, 
      bookingData: { name, email, phone, date, time, guests, message }
    });

    // Format date for display
    const bookingDateFormatted = bookingDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Send OTP via email
    const otpEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #1a1a1a; margin-bottom: 20px;">Verify Your Booking</h1>
          
          <p style="color: #333; font-size: 15px; margin-bottom: 20px;">Dear ${name},</p>
          
          <p style="color: #333; font-size: 15px; margin-bottom: 30px;">
            We received your table reservation request. Please use the following code to verify your booking:
          </p>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px; border: 2px solid #d4a574;">
            <p style="color: #666; font-size: 14px; margin: 0 0 10px 0;">Verification Code</p>
            <p style="color: #1a1a1a; font-size: 32px; font-weight: bold; letter-spacing: 5px; margin: 0;">${otp}</p>
            <p style="color: #999; font-size: 12px; margin: 10px 0 0 0;">Valid for 10 minutes</p>
          </div>

          <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #d4a574; font-size: 14px; margin-top: 0;">Reservation Details</h3>
            <p style="margin: 8px 0; color: #333; font-size: 14px;"><strong>Date:</strong> ${bookingDateFormatted}</p>
            <p style="margin: 8px 0; color: #333; font-size: 14px;"><strong>Time:</strong> ${time}</p>
            <p style="margin: 8px 0; color: #333; font-size: 14px;"><strong>Guests:</strong> ${guests}</p>
          </div>

          <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
            If you did not make this request, please ignore this email.
          </p>
          
          <p style="color: #999; font-size: 12px; border-top: 1px solid #e5e7eb; padding-top: 15px; margin-top: 30px;">
            This code will expire in 10 minutes.
          </p>
        </div>
      </div>
    `;

    const otpMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Verify Your Table Booking - 6-Digit Code',
      html: otpEmailHtml,
    };

    await transporter.sendMail(otpMailOptions);

    res.json({
      success: true,
      otpId,
      message: 'OTP sent to your email. Please verify to confirm your booking.'
    });

  } catch (error) {
    console.error('Error generating OTP:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate OTP. Please try again.',
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
});

// Step 2: Verify OTP and confirm booking
app.post('/api/verify-otp', async (req: Request, res: Response) => {
  try {
    const { otpId, otp } = req.body;

    if (!otpId || !otp) {
      return res.status(400).json({
        success: false,
        message: 'OTP ID and OTP code are required'
      });
    }

    const otpData = otpStorage.get(otpId);

    if (!otpData) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP ID. Please try again.'
      });
    }

    // Check OTP expiration
    if (Date.now() > otpData.expiresAt) {
      otpStorage.delete(otpId);
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.'
      });
    }

    // Verify OTP
    if (otpData.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Incorrect OTP. Please try again.'
      });
    }

    // OTP is correct, send confirmation emails
    const { name, email, phone, date, time, guests, message } = otpData.bookingData;
    const bookingDate = new Date(date);
    const formattedDate = bookingDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Email to restaurant
    const restaurantEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #1a1a1a; margin-bottom: 30px; border-bottom: 2px solid #d4a574; padding-bottom: 15px;">
            New Table Booking - CONFIRMED
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
            <p style="margin: 5px 0;"><strong style="color: #d4a574;">✓ VERIFIED & CONFIRMED</strong></p>
            <p style="margin: 5px 0;">Booking confirmed on: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </div>
    `;

    const restaurantMailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: `✓ CONFIRMED: Table Booking - ${name} on ${formattedDate} at ${time}`,
      html: restaurantEmailHtml,
      replyTo: email,
    };

    await transporter.sendMail(restaurantMailOptions);

    // Email to customer
    const customerConfirmationHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
        <div style="background-color: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          <h1 style="color: #1a1a1a; margin-bottom: 20px;">✓ Booking Confirmed!</h1>
          
          <p style="color: #333; font-size: 15px; margin-bottom: 20px;">Dear ${name},</p>
          
          <p style="color: #333; font-size: 15px; margin-bottom: 20px;">
            Your reservation has been confirmed! We're excited to welcome you to our restaurant.
          </p>

          <div style="background-color: #f9fafb; padding: 15px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #d4a574;">
            <h3 style="color: #d4a574; font-size: 14px; margin-top: 0;">Reservation Details</h3>
            <p style="margin: 8px 0; color: #333; font-size: 14px;"><strong>Date:</strong> ${formattedDate}</p>
            <p style="margin: 8px 0; color: #333; font-size: 14px;"><strong>Time:</strong> ${time}</p>
            <p style="margin: 8px 0; color: #333; font-size: 14px;"><strong>Party Size:</strong> ${guests} guest${guests > 1 ? 's' : ''}</p>
          </div>

          <p style="color: #333; font-size: 15px; margin-bottom: 15px;">
            Please arrive 5-10 minutes earlier. If you need to make any changes, contact us at your earliest convenience.
          </p>

          <p style="color: #333; font-size: 15px;">We look forward to serving you!</p>
          
          <p style="color: #999; font-size: 12px; margin-top: 30px; border-top: 1px solid #e5e7eb; padding-top: 15px;">
            This is a confirmed reservation. Please do not reply to this email directly.
          </p>
        </div>
      </div>
    `;

    const customerConfirmationOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `✓ Booking Confirmed - ${formattedDate} at ${time}`,
      html: customerConfirmationHtml,
    };

    await transporter.sendMail(customerConfirmationOptions);

    // Clean up OTP
    otpStorage.delete(otpId);

    res.json({
      success: true,
      message: 'Booking confirmed successfully! Check your email for details.'
    });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify booking. Please try again.',
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
