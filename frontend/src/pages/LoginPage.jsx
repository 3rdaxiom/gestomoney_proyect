// Archivo: src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { showSuccess, showError } from '../utils/notifications';
import PasswordInput from '../components/Common/PasswordInput';
import '../assets/styles/auth.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

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
        <div className="auth-info-panel auth-info-panel--login">
          
          
        </div>

        {/* Panel Derecho - Formulario */}
        <div className="auth-form-panel">
          <h2 className="auth-title">Bienvenido de nuevo</h2>
          <p className="auth-subtitle">
            Introduce tus credenciales para acceder a tu cuenta.
          </p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Introduce tu correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <PasswordInput
                id="password"
                name="password"
                placeholder="Introduce tu contraseña"
                value={formData.password}
                onChange={handleChange}
                required
              />
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
                Recordarme
              </label>
              <a href="#" className="forgot-password-link">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="btn btn-login-primary"
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>

            <div className="form-footer">
              ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;