import React, { useState, useEffect } from 'react';

function StudentDashboard() {
  const [message, setMessage] = useState('');

  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem('studentProfile');
    return saved ? JSON.parse(saved) : { learningPreferences: '', progressJson: '' };
  });

  const [availableClasses] = useState([
    { id: 1, title: 'Contemporary Basics', instructor: 'Alex', schedule: 'Mon 6-7pm' },
    { id: 2, title: 'Jazz Advanced', instructor: 'Jane', schedule: 'Wed 7-8pm' },
    { id: 3, title: 'Hip-hop Fun', instructor: 'Mike', schedule: 'Fri 5-6pm' }
  ]);

  const [enrolledClasses, setEnrolledClasses] = useState(() => {
    const saved = localStorage.getItem('enrolledClasses');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('studentProfile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('enrolledClasses', JSON.stringify(enrolledClasses));
  }, [enrolledClasses]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const enrollClass = (classId) => {
    if (enrolledClasses.some(cls => cls.id === classId)) {
      setMessage('Already enrolled in this class.');
      return;
    }
    const clsToEnroll = availableClasses.find(cls => cls.id === classId);
    setEnrolledClasses(prev => [...prev, clsToEnroll]);
    setMessage(`Enrolled in ${clsToEnroll.title}.`);
  };

  const unenrollClass = (classId) => {
    setEnrolledClasses(enrolledClasses.filter(cls => cls.id !== classId));
    setMessage('Class unenrolled.');
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Student Dashboard</h1>
        <p className="dashboard-subtitle">Manage your profile and classes</p>
        {message && <div className="message message-success" style={{ maxWidth: 800, margin: '1rem auto 0' }}>{message}</div>}
      </div>

      <div className="dashboard-content">
        <div className="dashboard-card">
          <h2 className="card-title">Profile</h2>
          <div className="card-content">
            <div className="form-group">
              <label className="form-label">Learning Preferences</label>
              <textarea
                name="learningPreferences"
                value={profile.learningPreferences}
                onChange={handleProfileChange}
                placeholder="Describe your learning preferences"
                rows={4}
                className="form-input"
                style={{ height: '120px' }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Progress (JSON format)</label>
              <textarea
                name="progressJson"
                value={profile.progressJson}
                onChange={handleProfileChange}
                placeholder='{"classId": "progressDetails"}'
                rows={4}
                className="form-input"
                style={{ height: '120px' }}
              />
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h2 className="card-title">Available Classes</h2>
          <ul className="card-content" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {availableClasses.map(cls => (
              <li key={cls.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span>
                  <strong>{cls.title}</strong> by {cls.instructor} - {cls.schedule}
                </span>
                <button className="btn btn-secondary" onClick={() => enrollClass(cls.id)}>Enroll</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="dashboard-card">
          <h2 className="card-title">My Enrolled Classes</h2>
          {enrolledClasses.length === 0 ? (
            <p className="card-content">No classes enrolled yet.</p>
          ) : (
            <ul className="card-content" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {enrolledClasses.map(cls => (
                <li key={cls.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                  <span>
                    <strong>{cls.title}</strong> by {cls.instructor} - {cls.schedule}
                  </span>
                  <button className="btn btn-danger" onClick={() => unenrollClass(cls.id)}>Unenroll</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
  