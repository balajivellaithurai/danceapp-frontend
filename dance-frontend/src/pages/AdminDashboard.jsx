import React, { useState, useEffect } from 'react';
import './dashboard.css';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('users');
  const [message, setMessage] = useState('');

  // Users state stored locally
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('adminUsers');
    return saved ? JSON.parse(saved) : [];
  });

  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'STUDENT' });

  // Reports or feedback stored locally
  const [reports] = useState(() => {
    const saved = localStorage.getItem('adminReports');
    return saved ? JSON.parse(saved) : [];
  });

  // Settings stored locally
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('adminSettings');
    return saved ? JSON.parse(saved) : { siteName: 'Dance Platform', maintenanceMode: false };
  });

  // Sync users with localStorage
  useEffect(() => {
    localStorage.setItem('adminUsers', JSON.stringify(users));
  }, [users]);

  // Sync reports with localStorage
  useEffect(() => {
    localStorage.setItem('adminReports', JSON.stringify(reports));
  }, [reports]);

  // Sync settings with localStorage
  useEffect(() => {
    localStorage.setItem('adminSettings', JSON.stringify(settings));
  }, [settings]);

  // Handlers for user management
  const addUser = () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      setMessage('Please enter name, email, and role.');
      return;
    }
    if (users.some(u => u.email === newUser.email)) {
      setMessage('User with this email already exists.');
      return;
    }
    setUsers(prev => [...prev, { ...newUser }]);
    setNewUser({ name: '', email: '', role: 'STUDENT' });
    setMessage('User added locally.');
  };

  const removeUser = (email) => {
    setUsers(users.filter(u => u.email !== email));
    setMessage('User removed locally.');
  };

  // Settings handlers
  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    setMessage('Settings saved locally.');
  };

  return (
    <div className="container page-wrapper">
      <h1 className="dashboard-header">Admin Dashboard</h1>

      {message && <div className="status-message card-shadow mb-16">{message}</div>}

      <nav className="tabs mb-16 card-shadow">
        <button className={`tab-button ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>Users</button>
        <button className={`tab-button ${activeTab === 'reports' ? 'active' : ''}`} onClick={() => setActiveTab('reports')}>Reports</button>
        <button className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>Settings</button>
      </nav>

      {activeTab === 'users' && (
        <section className="dashboard-grid grid grid-2">
          <div className="card-shadow">
            <h3 className="section-header">Add User</h3>
            <div className="input-row">
              <input
                type="text"
                placeholder="Name"
                value={newUser.name}
                onChange={e => setNewUser(prev => ({ ...prev, name: e.target.value }))}
              />
              <input
                type="email"
                placeholder="Email"
                value={newUser.email}
                onChange={e => setNewUser(prev => ({ ...prev, email: e.target.value }))}
              />
              <select
                value={newUser.role}
                onChange={e => setNewUser(prev => ({ ...prev, role: e.target.value }))}
              >
                <option value="INSTRUCTOR">Instructor</option>
                <option value="STUDENT">Student</option>
                <option value="ADMIN">Admin</option>
              </select>
              <button onClick={addUser}>Add</button>
            </div>
          </div>

          <div className="card-shadow">
            <h3 className="section-header">Manage Users</h3>
            {users.length === 0 ? (
              <p className="muted-text">No users found.</p>
            ) : (
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th className="actions-col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.email}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td className="actions">
                          <button className="danger" onClick={() => removeUser(user.email)}>Remove</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      )}

      {activeTab === 'reports' && (
        <section>
          <h3>Site Reports & Feedback</h3>
          {reports.length === 0 ? (
            <p className="muted-text">No reports available.</p>
          ) : (
            <ul>
              {reports.map(report => (
                <li key={report.id}>
                  <strong>{report.title}</strong>: {report.details}
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {activeTab === 'settings' && (
        <section>
          <h3>Platform Settings</h3>
          <label>
            Site Name:
            <input
              type="text"
              value={settings.siteName}
              onChange={e => handleSettingChange('siteName', e.target.value)}
            />
          </label>
          <br />
          <label>
            Maintenance Mode:
            <input
              type="checkbox"
              checked={settings.maintenanceMode}
              onChange={e => handleSettingChange('maintenanceMode', e.target.checked)}
            />
          </label>
          <br />
          <button onClick={saveSettings}>Save Settings</button>
        </section>
      )}
    </div>
  );
}

export default AdminDashboard;
