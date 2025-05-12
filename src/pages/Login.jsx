import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import './Auth.css';
import { login } from '../services/login';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
   login(formData.email, formData.password)
  };

  return (
<div className='auth-page'>
<h1 className="main-heading">Welcome to the Students' Register</h1>
    <div className="auth-container">
      <h2>Login</h2>
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
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
}

export default Login;
