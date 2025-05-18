import { useEffect, useState } from 'react';
import axios from './api/axios'; // Adjust path if needed
import './BookingList.css'; // Optional for styling

function BookingList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/booking/getAllBookings'); // Update to your real endpoint
        setBookings(response.data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load bookings.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="booking-list-container">
      <h2>All Bookings</h2>
      {loading && <p>Loading bookings...</p>}
      {error && <p>{error}</p>}
      {!loading && bookings.length === 0 && <p>No bookings found.</p>}

      <ul className="booking-list">
        {bookings.map((booking) => (
          <li key={booking.id} className="booking-card">
            <p><strong>Name:</strong> {booking.fullName}</p>
            <p><strong>Email:</strong> {booking.email}</p>
            <p><strong>Phone:</strong> {booking.phone}</p>
            <p><strong>Plate Number:</strong> {booking.plateNumber}</p>
            <p><strong>Date:</strong> {new Date(booking.bookingDate).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookingList;
