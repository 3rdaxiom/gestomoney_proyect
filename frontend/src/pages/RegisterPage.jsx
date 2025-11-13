// Archivo: src/pages/RegisterPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showSuccess, showError } from '../utils/notifications';
import '../assets/styles/auth.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    text: '',
    class: 'weak',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Calcular fuerza de contraseña
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) score++;
    if (password.match(/[0-9]/)) score++;
    if (password.match(/[^a-zA-Z0-9\s]/)) score++;

    let strength = { score: 0, text: '', class: 'weak' };

    if (score >= 4) {
      strength = { score: 4, text: 'Strong', class: 'strong' };
    } else if (score >= 2) {
      strength = { score: score, text: 'Medium', class: 'medium' };
    } else if (password.length > 0) {
      strength = { score: 1, text: 'Weak', class: 'weak' };
    }

    setPasswordStrength(strength);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      showError('Las contraseñas no coinciden');
      return;
    }

    if (!formData.terms) {
      showError('Debes aceptar los términos y condiciones');
      return;
    }

    if (passwordStrength.score < 2) {
      showError('La contraseña es muy débil. Usa al menos 8 caracteres con mayúsculas, minúsculas y números.');
      return;
    }

    setLoading(true);

    const result = await register({
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (result.success) {
      showSuccess('¡Registro exitoso! Redirigiendo al login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      showError(result.message);
    }
  };

  return (
    <div className="auth-body">
      <div className="auth-container">
        {/* Panel Izquierdo */}
        <div className="auth-info-panel register-info">
          <div className="logo">Gestomoney</div>
          <p className="tagline">
            Start managing your finances with clarity. Create your free account.
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
              📊
            </div>
          </div>
        </div>

        {/* Panel Derecho - Formulario */}
        <div className="auth-form-panel">
          <h2 className="auth-title">Welcome to Gestomoney</h2>

          {/* Botones de login social (opcional - sin funcionalidad por ahora) */}
          <div className="social-login-group">
            <button type="button" className="btn-social btn-google">
              <span style={{ marginRight: '8px' }}>🔍</span>
              Sign up with Google
            </button>
            <button type="button" className="btn-social btn-apple">
              <span style={{ marginRight: '8px' }}>🍎</span>
              Sign up with Apple
            </button>
          </div>

          <div className="divider">Or continue with</div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
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
                  placeholder="Create a password"
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
              {formData.password && (
                <div className="password-strength-indicator">
                  <div className={`strength-bar ${passwordStrength.class}`}></div>
                  <span className={`strength-text ${passwordStrength.class}`}>
                    {passwordStrength.text}
                  </span>
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group form-terms">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                />
                I agree to the{' '}
                <a href="#" style={{ color: 'var(--color-primary)' }}>
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" style={{ color: 'var(--color-primary)' }}>
                  Privacy Policy
                </a>
                .
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-login-primary"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>

            <div className="form-footer">
              Already have an account? <Link to="/login">Log In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;