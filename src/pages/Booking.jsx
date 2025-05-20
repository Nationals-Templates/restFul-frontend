import { useState } from 'react';
import axios from '../api/axios'; // your configured axios instance
import './Booking.css';

function Booking() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    plateNumber: '',
    parkingId: '', // optional, can be empty string or a select input
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure user is logged in and token is set in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to book a parking slot.');
      return;
    }

    // Prepare payload exactly as backend expects, NO entryTime, NO userId
    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      plateNumber: formData.plateNumber,
      parkingId: formData.parkingId ? Number(formData.parkingId) : null,
    };

    try {
      const response = await axios.post('/booking/create', payload);
      alert('Booking successful!');
      setMessage('Booking submitted successfully!');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        plateNumber: '',
        parkingId: '',
      });
    } catch (err) {
      console.error('Booking error:', err.response?.data || err.message);
      setMessage('Failed to submit booking. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <h2>Register in the XWZ parking</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
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
        {/* Optionally add parkingId as select or input if you want */}
        {/* <input
          type="number"
          name="parkingId"
          placeholder="Parking ID (optional)"
          value={formData.parkingId}
          onChange={handleChange}
        /> */}
        <button type="submit">Register Now</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Booking;
