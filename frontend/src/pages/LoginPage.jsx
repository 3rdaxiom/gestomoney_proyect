// Archivo: src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showSuccess, showError } from '../utils/notifications';
import '../assets/styles/auth.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login({
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (result.success) {
      showSuccess('¡Bienvenido de nuevo!');
      navigate('/dashboard');
    } else {
      showError(result.message);
    }
  };

  return (
    <div className="auth-body">
      <div className="auth-container">
        {/* Panel Izquierdo */}
        <div className="auth-info-panel">
          <div className="logo">Gestomoney</div>
          <p className="tagline">
            Clarity for your finances. Take control of your money.
          </p>
          <div className="auth-image-placeholder">
            <div style={{
              width: '100%',
              height: '200px',
              backgroundColor: '#e9ecef',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '3rem'
            }}>
              💰
            </div>
          </div>
        </div>

        {/* Panel Derecho - Formulario */}
        <div className="auth-form-panel">
          <h2 className="auth-title">Welcome Back</h2>
          <p className="auth-subtitle">
            Enter your credentials to access your account.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '🔒' : '👁️'}
                </span>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                Remember me
              </label>
              <a href="#" className="forgot-password-link">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="btn btn-login-primary"
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>

            <div className="form-footer">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;