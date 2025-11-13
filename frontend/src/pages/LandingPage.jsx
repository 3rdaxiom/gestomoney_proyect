// Archivo: src/pages/LandingPage.jsx
import { Link } from 'react-router-dom';
import '../assets/styles/landing.css';

const LandingPage = () => {
  return (
    <div>
      <header className="header">
        <div className="container header-content">
          <div className="logo">Gestomoney</div>
          <nav className="nav">
            <a href="#features" className="nav-link">Features</a>
            <a href="#testimonials" className="nav-link">Pricing</a>
            <a href="#about" className="nav-link">About</a>
          </nav>
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-text">Log In</Link>
            <Link to="/register" className="btn btn-primary">Sign Up for Free</Link>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-content">
            <div className="hero-text">
              <h1>Take Control of Your Finances, Effortlessly</h1>
              <p>Gestomoney helps you track income, manage expenses, and monitor your financial health all in one place.</p>
              <Link to="/register" className="btn btn-primary btn-lg">Sign Up for Free</Link>
            </div>
            <div className="hero-image">
              <div style={{
                width: '100%',
                height: '400px',
                backgroundColor: '#e9ecef',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6c757d',
                fontSize: '1.2rem'
              }}>
                📊 Dashboard Preview
              </div>
            </div>
          </div>
        </section>

        <section className="features" id="features">
          <div className="container">
            <h2 className="section-title">Everything You Need for Financial Clarity</h2>
            <p className="section-subtitle">Our powerful features are designed to give you a complete and intuitive overview of your financial life.</p>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="icon-placeholder">📈</div>
                <h3>Centralized Tracking</h3>
                <p>Visualize the full picture of your income and expenses.</p>
              </div>
              <div className="feature-card">
                <div className="icon-placeholder">📊</div>
                <h3>Insightful Visualizations</h3>
                <p>Understand your spending habits at a glance.</p>
              </div>
              <div className="feature-card">
                <div className="icon-placeholder">🏷️</div>
                <h3>Smart Categorization</h3>
                <p>Classify transactions easily to save you time and gain accurate insights.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="visualization-teaser">
          <div className="container">
            <h2 className="section-title">Visualize Your Spending Habits</h2>
            <p className="section-subtitle">Our interactive graphs provide clarity and insight into where your money is going, helping you make smarter financial decisions.</p>
            <div className="visualization-placeholder">📈 Interactive Chart Preview</div>
          </div>
        </section>

        <section className="testimonials" id="testimonials">
          <div className="container">
            <h2 className="section-title">Loved by Users Worldwide</h2>
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <p className="quote">"I finally feel organized with my money. Understanding where my income goes is so much clearer, and the visualizations are a game-changer."</p>
                <div className="user-info">
                  <div className="avatar">SL</div>
                  <div>
                    <p className="user-name">Sarah L.</p>
                    <p className="user-role">Freelance Designer</p>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <p className="quote">"Gestomoney has transformed how I manage my finances. The insights are invaluable and the interface is beautiful."</p>
                <div className="user-info">
                  <div className="avatar">JD</div>
                  <div>
                    <p className="user-name">John D.</p>
                    <p className="user-role">Small Business Owner</p>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <p className="quote">"Simple, elegant, and powerful. Everything I need to stay on top of my budget in one place."</p>
                <div className="user-info">
                  <div className="avatar">MR</div>
                  <div>
                    <p className="user-name">Maria R.</p>
                    <p className="user-role">Marketing Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-cta-content">
            <h2>Ready to achieve financial clarity?</h2>
            <p>Start your journey with Gestomoney today. It's free to get started and takes less than a minute.</p>
            <Link to="/register" className="btn btn-secondary btn-lg">Get Started</Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <p>&copy; 2024 Gestomoney. All rights reserved.</p>
          <div className="footer-links">
            <a href="#terms">Terms of Service</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;