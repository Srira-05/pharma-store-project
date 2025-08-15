import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber)) {
      return setError('A valid 10-digit mobile number is required.');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters long.');
    }

    if (isLoginView) {
      try {
        const response = await axios.post('https://pharma-store-project.onrender.com/api/login', {
          mobileNumber,
          password,
        });
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard');
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed. Please try again.');
      }
    } else {
      try {
        const response = await axios.post('https://pharma-store-project.onrender.com/api/register', {
          mobileNumber,
          password,
        });
        setSuccessMessage(response.data.message + " Please log in.");
        setIsLoginView(true);
      } catch (err) {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
      }
    }
  };

  return (
    <div className="login-page-background">
      <div className="login-modal">
        <div className="login-content">
          <p className="greeting-text">Hello User,</p>
          <h2 className="welcome-title">
            {isLoginView ? 'Welcome to PharmaCare' : 'Create Your Account'}
          </h2>
          <form onSubmit={handleSubmit}>
            <p className="instruction-text">
              {isLoginView ? 'Login with your Mobile Number' : 'Sign up to get started'}
            </p>
            <div className="input-wrapper">
              <input type="tel" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className="input-field" placeholder="Mobile Number" maxLength="10" />
            </div>
            <div className="input-wrapper">
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" placeholder="Password" />
            </div>
            {error && <p className="error-text">{error}</p>}
            {successMessage && <p className="success-text">{successMessage}</p>}
            <button type="submit" className="submit-button">
              {isLoginView ? 'Login' : 'Register'}
            </button>
          </form>
          <p className="toggle-view-text">
            {isLoginView ? "Don't have an account?" : "Already have an account?"}
            <button onClick={() => { setIsLoginView(!isLoginView); setError(''); setSuccessMessage(''); }} className="toggle-view-button">
              {isLoginView ? 'Register' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;