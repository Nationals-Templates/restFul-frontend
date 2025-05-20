import API from '../api/axios';

// Get all bookings with nested user and parking info
export async function getAllBookings() {
  try {
    const response = await API.get('/bookings'); // your backend returns bookings with user and parking info
    return response.data; // [{ id, user: {name, email}, plateNumber, parkingName, status, exited }]
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    return [];
  }
}

// Search bookings by plateNumber (with nested user and parking info)
export async function getBookingsByPlateNumber(plateNumber) {
  try {
    const response = await API.get(`/bookings?plateNumber=${plateNumber}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch bookings by plate number:', error);
    return [];
  }
}

// Update booking status, e.g. mark exit status
export async function updateBooking(id, updatedStatus) {
  try {
    const response = await API.patch(`/bookings/${id}`, { status: updatedStatus });
    return response.data;
  } catch (error) {
    console.error(`Failed to update booking status for ${id}:`, error);
    return null;
  }
}
