import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authservices from '../../services/authService';
import '../../styles/auth.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await authservices.register(formData);
      navigate('/signin');
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Create Account</h2>
            <p>Sign up to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="auth-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="auth-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="auth-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                className="auth-input"
              />
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="auth-button">
              Sign Up
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <a href="/signin" className="auth-link">Sign In</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
