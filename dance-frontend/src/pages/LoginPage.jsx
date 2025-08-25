import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await onLogin(email, password);
      navigate('/dashboard'); 
    } catch {
      setError('Login failed. Please check your email and password.');
    }
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Welcome Back</h1>
        <p className="page-subtitle">Sign in to your DanceIns account</p>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="message message-error">{error}</div>}
          
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="Enter your email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              placeholder="Enter your password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
            <Link to="/register" className="btn btn-secondary">
              Create Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
