 import React, { useState } from 'react';

const RegisterPages = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const roles = ['STUDENT', 'INSTRUCTOR', 'ADMIN'];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await onRegister(formData);
      setSuccess('Registration successful! You can now login.');
      setFormData({ name: '', email: '', password: '', role: 'STUDENT' });
    } catch {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Join DanceIns</h1>
        <p className="page-subtitle">Create your account and start your dance journey</p>
        
        <form onSubmit={handleSubmit}>
          {success && <div className="message message-success">{success}</div>}
          {error && <div className="message message-error">{error}</div>}
          
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              name="name"
              type="text"
              className="form-input"
              placeholder="Enter your full name"
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-input"
              placeholder="Enter your email"
              required
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-input"
              placeholder="Create a password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Role</label>
            <select 
              name="role" 
              className="form-select"
              value={formData.role} 
              onChange={handleChange}
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role.charAt(0) + role.slice(1).toLowerCase()}
                </option>
              ))}
            </select>
          </div>
          
          <button type="submit" className="btn btn-primary">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPages;
