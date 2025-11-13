// Archivo: src/pages/SettingsPage.jsx
import { useState } from 'react';
import DashboardLayout from '../components/Layout/DashboardLayout';
import Header from '../components/Layout/Header';
import { useAuth } from '../context/AuthContext';
import { showSuccess, showError, showConfirm } from '../utils/notifications';

const SettingsPage = () => {
  const { user } = useAuth();

  const [profileData, setProfileData] = useState({
    fullName: user?.name || 'Usuario',
    email: 'user@gestomoney.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [preferences, setPreferences] = useState({
    language: 'es',
    currency: 'USD',
    dateFormat: 'DD/MM/YYYY',
    timezone: 'America/Mexico_City',
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    budgetAlerts: true,
    weeklyReport: true,
  });

  const [appearance, setAppearance] = useState({
    theme: 'dark',
    fontSize: 'medium',
    density: 'comfortable',
  });

  const [expandedSections, setExpandedSections] = useState({
    profile: false,
    preferences: false,
    notifications: false,
    appearance: false,
    security: false,
    data: false,
    danger: false,
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handlePreferenceChange = (e) => {
    const { name, value } = e.target;
    setPreferences({ ...preferences, [name]: value });
  };

  const handleNotificationToggle = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const handleAppearanceChange = (e) => {
    const { name, value } = e.target;
    setAppearance({ ...appearance, [name]: value });
  };

  const handleSaveProfile = () => {
    if (profileData.newPassword && profileData.newPassword !== profileData.confirmPassword) {
      showError('Las contraseñas no coinciden');
      return;
    }
    if (profileData.newPassword && profileData.newPassword.length < 8) {
      showError('La contraseña debe tener al menos 8 caracteres');
      return;
    }
    showSuccess('Perfil actualizado correctamente');
  };

  const handleSavePreferences = () => {
    showSuccess('Preferencias guardadas correctamente');
  };

  const handleSaveNotifications = () => {
    showSuccess('Configuración de notificaciones guardada');
  };

  const handleSaveAppearance = () => {
    showSuccess('Configuración de apariencia guardada');
  };

  const handleExportData = (format) => {
    showSuccess(`Exportando datos en formato ${format}...`);
  };

  const handleDeleteAccount = () => {
    showConfirm(
      '¿Estás seguro de que quieres eliminar tu cuenta? Esta acción no se puede deshacer.',
      () => {
        showSuccess('Cuenta eliminada correctamente');
      }
    );
  };

  const getInitials = (name) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  return (
    <DashboardLayout>
      <Header title="Settings" subtitle="Manage your account settings and preferences" />
      <section className="dashboard-content">
        <div className="settings-container">
          
          <div className="settings-section">
            <div className="settings-section-header" onClick={() => toggleSection('profile')}>
              <div className="settings-section-header-left">
                <span className="settings-section-icon">👤</span>
                <div className="settings-section-info">
                  <h2 className="settings-section-title">Profile Information</h2>
                  <p className="settings-section-description">Update your account profile information and email address</p>
                </div>
              </div>
              <span className={`settings-section-toggle ${expandedSections.profile ? '' : 'collapsed'}`}>▼</span>
            </div>
            <div className={`settings-section-content ${expandedSections.profile ? 'expanded' : ''}`}>
              <div className="settings-avatar-container">
                <div className="settings-avatar">{getInitials(profileData.fullName)}</div>
                <div className="settings-avatar-info">
                  <h3>{profileData.fullName}</h3>
                  <p>{profileData.email}</p>
                </div>
                <div className="settings-avatar-actions">
                  <button className="btn btn-secondary" style={{ fontSize: '0.9rem' }}>Change Photo</button>
                  <button className="btn btn-text" style={{ fontSize: '0.9rem' }}>Remove</button>
                </div>
              </div>
              <form className="settings-form">
                <div className="settings-form-row">
                  <div className="settings-form-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" name="fullName" value={profileData.fullName} onChange={handleProfileChange} />
                  </div>
                  <div className="settings-form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" id="email" name="email" value={profileData.email} onChange={handleProfileChange} />
                  </div>
                </div>
                <div className="settings-form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input type="password" id="currentPassword" name="currentPassword" placeholder="Enter current password to change it" value={profileData.currentPassword} onChange={handleProfileChange} />
                </div>
                <div className="settings-form-row">
                  <div className="settings-form-group">
                    <label htmlFor="newPassword">New Password</label>
                    <input type="password" id="newPassword" name="newPassword" placeholder="Enter new password" value={profileData.newPassword} onChange={handleProfileChange} />
                    <small>Minimum 8 characters with uppercase, lowercase and numbers</small>
                  </div>
                  <div className="settings-form-group">
                    <label htmlFor="confirmPassword">Confirm New Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm new password" value={profileData.confirmPassword} onChange={handleProfileChange} />
                  </div>
                </div>
                <div className="settings-actions">
                  <button type="button" className="btn btn-text">Cancel</button>
                  <button type="button" className="btn btn-primary" onClick={handleSaveProfile}>Save Changes</button>
                </div>
              </form>
            </div>
          </div>

          <div className="settings-section">
            <div className="settings-section-header" onClick={() => toggleSection('preferences')}>
              <div className="settings-section-header-left">
                <span className="settings-section-icon">⚙️</span>
                <div className="settings-section-info">
                  <h2 className="settings-section-title">Application Preferences</h2>
                  <p className="settings-section-description">Customize how you view and interact with the application</p>
                </div>
              </div>
              <span className={`settings-section-toggle ${expandedSections.preferences ? '' : 'collapsed'}`}>▼</span>
            </div>
            <div className={`settings-section-content ${expandedSections.preferences ? 'expanded' : ''}`}>
              <form className="settings-form">
                <div className="settings-form-row">
                  <div className="settings-form-group">
                    <label htmlFor="language">Language</label>
                    <select id="language" name="language" value={preferences.language} onChange={handlePreferenceChange}>
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>
                  <div className="settings-form-group">
                    <label htmlFor="currency">Default Currency</label>
                    <select id="currency" name="currency" value={preferences.currency} onChange={handlePreferenceChange}>
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="MXN">MXN - Mexican Peso</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="JPY">JPY - Japanese Yen</option>
                    </select>
                  </div>
                </div>
                <div className="settings-form-row">
                  <div className="settings-form-group">
                    <label htmlFor="dateFormat">Date Format</label>
                    <select id="dateFormat" name="dateFormat" value={preferences.dateFormat} onChange={handlePreferenceChange}>
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                  <div className="settings-form-group">
                    <label htmlFor="timezone">Timezone</label>
                    <select id="timezone" name="timezone" value={preferences.timezone} onChange={handlePreferenceChange}>
                      <option value="America/New_York">Eastern Time (ET)</option>
                      <option value="America/Chicago">Central Time (CT)</option>
                      <option value="America/Denver">Mountain Time (MT)</option>
                      <option value="America/Los_Angeles">Pacific Time (PT)</option>
                      <option value="America/Mexico_City">Mexico City (CDMX)</option>
                      <option value="Europe/London">London (GMT)</option>
                      <option value="Europe/Paris">Paris (CET)</option>
                    </select>
                  </div>
                </div>
                <div className="settings-actions">
                  <button type="button" className="btn btn-text">Reset to Default</button>
                  <button type="button" className="btn btn-primary" onClick={handleSavePreferences}>Save Preferences</button>
                </div>
              </form>
            </div>
          </div>

          <div className="settings-section">
            <div className="settings-section-header" onClick={() => toggleSection('notifications')}>
              <div className="settings-section-header-left">
                <span className="settings-section-icon">🔔</span>
                <div className="settings-section-info">
                  <h2 className="settings-section-title">Notifications</h2>
                  <p className="settings-section-description">Manage how you receive notifications and alerts</p>
                </div>
              </div>
              <span className={`settings-section-toggle ${expandedSections.notifications ? '' : 'collapsed'}`}>▼</span>
            </div>
            <div className={`settings-section-content ${expandedSections.notifications ? 'expanded' : ''}`}>
              <div className="settings-form">
                <div className="settings-toggle-group">
                  <div className="settings-toggle-info">
                    <span className="settings-toggle-label">Email Notifications</span>
                    <span className="settings-toggle-description">Receive email updates about your account activity</span>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={notifications.emailNotifications} onChange={() => handleNotificationToggle('emailNotifications')} />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="settings-toggle-group">
                  <div className="settings-toggle-info">
                    <span className="settings-toggle-label">Push Notifications</span>
                    <span className="settings-toggle-description">Receive push notifications on your device</span>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={notifications.pushNotifications} onChange={() => handleNotificationToggle('pushNotifications')} />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="settings-toggle-group">
                  <div className="settings-toggle-info">
                    <span className="settings-toggle-label">Budget Alerts</span>
                    <span className="settings-toggle-description">Get notified when approaching budget limits</span>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={notifications.budgetAlerts} onChange={() => handleNotificationToggle('budgetAlerts')} />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="settings-toggle-group">
                  <div className="settings-toggle-info">
                    <span className="settings-toggle-label">Weekly Report</span>
                    <span className="settings-toggle-description">Receive a weekly summary of your financial activity</span>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={notifications.weeklyReport} onChange={() => handleNotificationToggle('weeklyReport')} />
                    <span className="slider"></span>
                  </label>
                </div>
                <div className="settings-actions">
                  <button type="button" className="btn btn-primary" onClick={handleSaveNotifications}>Save Notification Settings</button>
                </div>
              </div>
            </div>
          </div>
	            <div className="settings-section">
            <div className="settings-section-header" onClick={() => toggleSection('appearance')}>
              <div className="settings-section-header-left">
                <span className="settings-section-icon">🎨</span>
                <div className="settings-section-info">
                  <h2 className="settings-section-title">Appearance</h2>
                  <p className="settings-section-description">Customize the look and feel of the application</p>
                </div>
              </div>
              <span className={`settings-section-toggle ${expandedSections.appearance ? '' : 'collapsed'}`}>▼</span>
            </div>
            <div className={`settings-section-content ${expandedSections.appearance ? 'expanded' : ''}`}>
              <form className="settings-form">
                <div className="settings-form-group">
                  <label htmlFor="theme">Theme</label>
                  <select id="theme" name="theme" value={appearance.theme} onChange={handleAppearanceChange}>
                    <option value="dark">Dark Mode</option>
                    <option value="light">Light Mode</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                  <small>Choose your preferred color scheme</small>
                </div>
                <div className="settings-form-row">
                  <div className="settings-form-group">
                    <label htmlFor="fontSize">Font Size</label>
                    <select id="fontSize" name="fontSize" value={appearance.fontSize} onChange={handleAppearanceChange}>
                      <option value="small">Small</option>
                      <option value="medium">Medium</option>
                      <option value="large">Large</option>
                    </select>
                  </div>
                  <div className="settings-form-group">
                    <label htmlFor="density">Information Density</label>
                    <select id="density" name="density" value={appearance.density} onChange={handleAppearanceChange}>
                      <option value="compact">Compact</option>
                      <option value="comfortable">Comfortable</option>
                      <option value="spacious">Spacious</option>
                    </select>
                  </div>
                </div>
                <div className="settings-actions">
                  <button type="button" className="btn btn-text">Reset to Default</button>
                  <button type="button" className="btn btn-primary" onClick={handleSaveAppearance}>Save Appearance</button>
                </div>
              </form>
            </div>
          </div>

          <div className="settings-section">
            <div className="settings-section-header" onClick={() => toggleSection('security')}>
              <div className="settings-section-header-left">
                <span className="settings-section-icon">🔒</span>
                <div className="settings-section-info">
                  <h2 className="settings-section-title">Privacy & Security</h2>
                  <p className="settings-section-description">Manage your security settings and privacy preferences</p>
                </div>
              </div>
              <span className={`settings-section-toggle ${expandedSections.security ? '' : 'collapsed'}`}>▼</span>
            </div>
            <div className={`settings-section-content ${expandedSections.security ? 'expanded' : ''}`}>
              <div className="settings-form">
                <div className="settings-toggle-group">
                  <div className="settings-toggle-info">
                    <span className="settings-toggle-label">Two-Factor Authentication (2FA)</span>
                    <span className="settings-toggle-description">Add an extra layer of security to your account</span>
                  </div>
                  <button className="btn btn-secondary" style={{ fontSize: '0.9rem' }}>Enable 2FA</button>
                </div>
                <div className="settings-form-group" style={{ marginTop: 'var(--spacing-md)' }}>
                  <label>Active Sessions</label>
                  <div style={{ backgroundColor: '#2c3444', padding: '12px', borderRadius: '6px', marginTop: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div>
                        <p style={{ fontWeight: 500, marginBottom: '4px' }}>💻 Windows - Chrome</p>
                        <p style={{ fontSize: '0.85rem', color: '#9fa6ad' }}>Current session • Last active: Just now</p>
                      </div>
                      <span style={{ color: 'var(--color-success)', fontSize: '0.85rem', fontWeight: 500 }}>Active</span>
                    </div>
                  </div>
                  <small style={{ display: 'block', marginTop: '8px' }}>You can revoke access to any session at any time</small>
                </div>
                <div className="settings-form-group" style={{ marginTop: 'var(--spacing-md)' }}>
                  <label>Activity Log</label>
                  <button className="btn btn-secondary" style={{ marginTop: '8px' }}>View Activity History</button>
                  <small style={{ display: 'block', marginTop: '8px' }}>See all recent activity on your account</small>
                </div>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <div className="settings-section-header" onClick={() => toggleSection('data')}>
              <div className="settings-section-header-left">
                <span className="settings-section-icon">📦</span>
                <div className="settings-section-info">
                  <h2 className="settings-section-title">Data & Export</h2>
                  <p className="settings-section-description">Download your data or manage your account</p>
                </div>
              </div>
              <span className={`settings-section-toggle ${expandedSections.data ? '' : 'collapsed'}`}>▼</span>
            </div>
            <div className={`settings-section-content ${expandedSections.data ? 'expanded' : ''}`}>
              <div className="settings-form">
                <div className="settings-form-group">
                  <label>Export Your Data</label>
                  <p style={{ fontSize: '0.9rem', color: '#9fa6ad', marginBottom: '12px' }}>
                    Download a copy of your transactions, categories, and account information
                  </p>
                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <button className="btn btn-secondary" onClick={() => handleExportData('CSV')}>📄 Export as CSV</button>
                    <button className="btn btn-secondary" onClick={() => handleExportData('JSON')}>📋 Export as JSON</button>
                    <button className="btn btn-secondary" onClick={() => handleExportData('PDF')}>📑 Export as PDF</button>
                  </div>
                </div>
                <div className="settings-form-group" style={{ marginTop: 'var(--spacing-lg)' }}>
                  <label>Download Complete Report</label>
                  <p style={{ fontSize: '0.9rem', color: '#9fa6ad', marginBottom: '12px' }}>
                    Generate a comprehensive report of all your financial data
                  </p>
                  <button className="btn btn-primary">📊 Generate Full Report</button>
                </div>
              </div>
            </div>
          </div>
          <div className="settings-section">
            <div className="settings-section-header" onClick={() => toggleSection('danger')}>
              <div className="settings-section-header-left">
                <span className="settings-section-icon">⚠️</span>
                <div className="settings-section-info">
                  <h2 className="settings-section-title">Danger Zone</h2>
                  <p className="settings-section-description">Irreversible and destructive actions</p>
                </div>
              </div>
              <span className={`settings-section-toggle ${expandedSections.danger ? '' : 'collapsed'}`}>▼</span>
            </div>
            <div className={`settings-section-content ${expandedSections.danger ? 'expanded' : ''}`}>
              <div className="settings-danger-zone">
                <h4>Delete Account</h4>
                <p>
                  Once you delete your account, there is no going back. All your data will be 
                  permanently deleted. Please be certain.
                </p>
                <button className="btn-danger" onClick={handleDeleteAccount}>🗑️ Delete My Account</button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </DashboardLayout>
  );
};

export default SettingsPage;