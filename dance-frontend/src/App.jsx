import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import apiClient from './api/apiClient';
import useAuth from './context/useAuth'; // import hook from new file
import './App.css';
import {jwtDecode} from 'jwt-decode';

const App = () => {
   const { token } = useAuth();

  useEffect(() => {
    console.log("Current auth token:", token);
  }, [token]);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Called on Login form submit
 const handleLogin = async (email, password) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    const { token, id, name, email: userEmail, role } = response.data;

    // Decode and log the token payload
    const decodedToken = jwtDecode(token);
    console.log('Decoded JWT token:', decodedToken);

    login({ id, name, email: userEmail, role }, token);

    navigate('/dashboard');
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // so LoginPage can show error message
  }
};

  // Called on Register form submit
  const handleRegister = async (formData) => {
    try {
      await apiClient.post('/auth/register', formData);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      // TODO: Show registration error to user
    }
  };

  return <AppRoutes onLogin={handleLogin} onRegister={handleRegister} />;
};

export default App;
