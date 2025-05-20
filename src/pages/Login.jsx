import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import { login } from '../services/login';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const result = await login(formData.email, formData.password);
  
      if (result?.success) {
        const user = result.data?.user;
      
        if (user?.role === "admin") {
          navigate("/dashboard");
        } else {
          navigate("/booking");
        }
      }
       else {
        throw new Error(result?.error || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className='auth-page'>
      <h1 className="main-heading">XWZ Parking Management System</h1>
      <div className="auth-container">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;