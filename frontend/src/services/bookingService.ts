// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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

// Send booking request to backend
export async function submitBooking(data: BookingData) {
  try {
    const response = await fetch(`${API_URL}/api/send-booking`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        guests: Number(data.guests), // Ensure guests is a number
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
