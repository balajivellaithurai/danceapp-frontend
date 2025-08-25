import React from 'react';
import StudentDashboard from './StudentDashboard';
import InstructorDashboard from './InstructorDashboard';
import AdminDashboard from './AdminDashboard';
import useAuth from '../context/useAuth';

const DashboardPage = () => {
  const { user } = useAuth();
  const userRole = user?.role;

  const getDashboardContent = () => {
    switch (userRole) {
      case 'STUDENT':
        return <StudentDashboard />;
      case 'INSTRUCTOR':
        return <InstructorDashboard />;
      case 'ADMIN':
        return <AdminDashboard />;
      default:
        return (
          <div className="dashboard-container">
            <div className="dashboard-header">
              <h1 className="dashboard-title">Welcome to DanceIns</h1>
              <p className="dashboard-subtitle">Your dance journey starts here</p>
            </div>
            <div className="dashboard-content">
              <div className="dashboard-card">
                <h2 className="card-title">Getting Started</h2>
                <p className="card-content">
                  Welcome to DanceIns! Please wait while we set up your dashboard based on your role.
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return getDashboardContent();
};

export default DashboardPage;
