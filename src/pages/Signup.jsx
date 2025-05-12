import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import './Auth.css';
import { signup } from '../services/signup';

function Signup() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(formData.email, formData.password)
  };
  const handleRedirect = (e)=>{
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className='auth-page'>
      <h1 className='main-heading'>Welcome to the Student Register</h1>
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          required
        />
        <button type="submit">Signup</button>
      </form>
      <p className='switch-auth'>
        Already have an account?{' '}
        <a href="/login" onClick={handleRedirect}>Login</a>
      </p>
    </div>
    </div>
  );
}

export default Signup;
