
// src/components/Auth/Login.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authAPI.login(formData);
      login(response.token, response.user);

      if (response.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/customer');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Bauhaus Background Shapes */}
      <div className="bauhaus-background">
        <div className="shape circle-red"></div>
        <div className="shape square-blue"></div>
        <div className="shape triangle-yellow"></div>
        <div className="shape circle-blue"></div>
        <div className="shape square-red"></div>
        <div className="shape triangle-blue"></div>
        <div className="shape circle-yellow"></div>
        <div className="shape square-yellow"></div>
        <div className="shape rectangle-red"></div>
        <div className="shape rectangle-blue"></div>
        <div className="shape small-circle-yellow"></div>
        <div className="shape small-square-red"></div>
      </div>

      {/* Main Content */}
      <div className="login-content">
        {/* Left Side - Branding */}
        <div className="login-branding">
          <div className="brand-shapes">
            <div className="brand-circle"></div>
            <div className="brand-square"></div>
            <div className="brand-triangle"></div>
          </div>
          <h1 className="brand-title">Restaurant</h1>
          <h2 className="brand-subtitle">Reservation System</h2>
          <p className="brand-description">
            Modern table booking made simple with geometric precision
          </p>
          <div className="brand-features">
            <div className="feature-item">
              <div className="feature-icon circle-icon"></div>
              <span>Instant Booking</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon square-icon"></div>
              <span>Real-time Updates</span>
            </div>
            <div className="feature-item">
              <div className="feature-icon triangle-icon"></div>
              <span>Smart Assignment</span>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-container">
          <div className="login-form-card">
            <div className="form-header">
              <h2 className="form-title">Welcome Back</h2>
              <p className="form-subtitle">Sign in to your account</p>
            </div>

            {error && (
              <div className="error-message">
                <svg className="error-icon" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <svg className="input-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="form-input"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="submit-button"
              >
                {loading ? (
                  <>
                    <svg className="loading-spinner" viewBox="0 0 24 24">
                      <circle className="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    </svg>
                    Logging in...
                  </>
                ) : (
                  <>
                    Sign In
                    <svg className="button-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="form-footer">
              <p className="signup-text">
                Don't have an account?{' '}
                <Link to="/register" className="signup-link">
                  Create Account
                </Link>
              </p>
            </div>

            <div className="test-accounts">
              <p className="test-accounts-title">Test Accounts</p>
              <div className="test-account-grid">
                <div className="test-account-card admin-card">
                  <div className="test-badge">Admin</div>
                  <p className="test-email">admin@restaurant.com</p>
                  <p className="test-password">admin123</p>
                </div>
                <div className="test-account-card customer-card">
                  <div className="test-badge">Customer</div>
                  <p className="test-email">john@example.com</p>
                  <p className="test-password">customer123</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;