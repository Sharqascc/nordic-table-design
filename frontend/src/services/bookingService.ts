// API Configuration
// Remove trailing slash to prevent double slash in URL
// Default to production backend URL if not set
const API_URL = (
  import.meta.env.VITE_API_URL || 
  (typeof window !== 'undefined' && window.location.hostname === 'localhost' 
    ? 'http://localhost:5000' 
    : 'https://nordic-table-design.vercel.app'
  )
).replace(/\/$/, '');

// Booking interface
export interface BookingData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number | string;
  message?: string;
}

// Validation functions
export function validatePhone(phone: string): { valid: boolean; error?: string } {
  const digits = phone.replace(/\D/g, '');
  if (digits.length !== 10) {
    return { valid: false, error: 'Phone number must be exactly 10 digits' };
  }
  return { valid: true };
}

export function validateDate(date: string): { valid: boolean; error?: string } {
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    return { valid: false, error: 'Cannot book for past dates' };
  }
  return { valid: true };
}

export function validateTime(time: string): { valid: boolean; error?: string } {
  const [hour] = time.split(':').map(Number);
  if (hour < 10 || hour >= 22) {
    return { valid: false, error: 'Please select a time between 10:00 AM and 10:00 PM' };
  }
  return { valid: true };
}

// Step 1: Generate OTP
export async function generateOTP(data: BookingData) {
  try {
    const response = await fetch(`${API_URL}/api/generate-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        guests: Number(data.guests),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to generate OTP');
    }

    return result;
  } catch (error) {
    console.error('OTP generation error:', error);
    throw error;
  }
}

// Step 2: Verify OTP and confirm booking
export async function verifyOTP(otpId: string, otp: string) {
  try {
    const response = await fetch(`${API_URL}/api/verify-otp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ otpId, otp }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to verify OTP');
    }

    return result;
  } catch (error) {
    console.error('OTP verification error:', error);
    throw error;
  }
}

// Send booking request to backend (backward compatibility)
export async function submitBooking(data: BookingData) {
  try {
    const response = await fetch(`${API_URL}/api/send-booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        guests: Number(data.guests),
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to submit booking');
    }

    return result;
  } catch (error) {
    console.error('Booking submission error:', error);
    throw error;
  }
}

// Check if backend is available
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_URL}/api/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch {
    return false;
  }
}
