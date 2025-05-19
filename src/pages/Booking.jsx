import { useState } from 'react';
import axios from '../api/axios'; // Make sure this is correctly pointing to your Axios config
import './Booking.css';

function Booking() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    plateNumber: '',
    entryTime: '',
    exitTime: '',
  });

  const [message, setMessage] = useState('');

  // Try to get user ID from localStorage (adjust according to your auth logic)
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user?.id;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert('You must be logged in to book a parking slot.');
      return;
    }

    const payload = {
      ...formData,
      userId,
    };

    try {
      const response = await axios.post('/booking/createBooking', payload);
      const { amount } = response.data;

      alert(`Booking successful! Your parking fee is RWF ${amount}`);
      setMessage('Booking submitted successfully!');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        plateNumber: '',
        entryTime: '',
        exitTime: '',
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
          type="time"
          name="entryTime"
          value={formData.entryTime}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="exitTime"
          value={formData.exitTime}
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
