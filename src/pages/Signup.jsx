import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { signup } from '../services/signup';

function Signup() {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '', 
    name: '', 
    phone: '' 
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Validate required fields
      if (!formData.email || !formData.password || !formData.name || !formData.phone) {
        throw new Error('All fields are required');
      }

      const result = await signup({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        phone: formData.phone
      });
      
      if (result?.success) {
        alert(result.message || 'Registration successful! Please verify your email with OTP.');
        // Redirect to OTP verification page with email in query string
        navigate(`/verify-otp?email=${encodeURIComponent(formData.email)}`);
      } else {
        throw new Error(result?.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setError(error.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRedirect = (e) => {
    e.preventDefault();
    navigate('/login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className='auth-page'>
      <h1 className='main-heading'>Welcome to the Parking Registration System</h1>
      <div className="auth-center">
        <div className="auth-container">
          <h2>Sign Up</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
            
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
            />
            
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={loading}
            />
            
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          
          <p className='switch-auth'>
            Already have an account?{' '}
            <a href="/login" onClick={handleRedirect}>Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
