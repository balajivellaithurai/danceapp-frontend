import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPages from '../pages/RegisterPages';
import DashboardPage from '../pages/DashboardPage';
import ProtectedRoute from './ProctectedRoute';

const AppRoutes = ({ onLogin, onRegister }) => {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage onLogin={onLogin} />} />
      <Route path="/register" element={<RegisterPages onRegister={onRegister} />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
