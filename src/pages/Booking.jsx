import { useState } from 'react';
import axios from '../api/axios'; // adjust path if needed
import './Booking.css';

function Booking() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    plateNumber: '',
    date: '',
  });

  const [message, setMessage] = useState('');
  const userId = 1; // Replace with actual user ID when using auth

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      plateNumber: formData.plateNumber,
      bookingDate: new Date(formData.date).toISOString(),
      userId: userId,
    };

    try {
      await axios.post('/booking/createBooking', payload); // baseURL handles the rest
      setMessage('Booking submitted successfully!');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        plateNumber: '',
        date: '',
      });
    } catch (err) {
      console.error('Booking error:', err.response?.data || err.message);
      setMessage('Failed to submit booking. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Book a Parking Slot</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Names"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="plateNumber"
          placeholder="Plate Number"
          value={formData.plateNumber}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <button type="submit">Book Now</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Booking;
