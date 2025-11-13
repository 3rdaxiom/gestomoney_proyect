// Archivo: src/components/Layout/Header.jsx
import { useAuth } from '../../context/AuthContext';

const Header = ({ title, subtitle, showFilters = false, onQuickAdd }) => {
  const { user } = useAuth();

  const getFirstName = (fullName) => {
    if (!fullName) return 'User';
    return fullName.split(' ')[0];
  };

  return (
    <header className="app-header">
      <div className="header-greeting">
        <h2 className="welcome-text">
          {title || `Welcome back, ${getFirstName(user?.name)}!`}
        </h2>
        {subtitle && <p className="summary-text">{subtitle}</p>}
      </div>

      <div className="header-actions">
        {showFilters && (
          <div className="time-filter">
            <select id="timeFilter" className="filter-select">
              <option value="this-month">Este Mes</option>
              <option value="last-month">Mes Pasado</option>
              <option value="this-year">Este Año</option>
              <option value="custom">Rango Personalizado</option>
            </select>
          </div>
        )}

        {onQuickAdd && (
          <button className="btn btn-primary quick-add-btn" onClick={onQuickAdd}>
            + Quick Add
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;