import React, { useState, useEffect } from 'react';
import './dashboard.css';

function InstructorDashboard() {
  const [activeTab, setActiveTab] = useState('students');
  const [message, setMessage] = useState('');

  // Students state synced with localStorage
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('instructorStudents');
    return saved ? JSON.parse(saved) : [
      { id: 1, email: 'sarah@example.com', name: 'Sarah Johnson', age: 24, level: 'Intermediate', lastClass: '2024-01-15' },
      { id: 2, email: 'mike@example.com', name: 'Mike Chen', age: 19, level: 'Beginner', lastClass: '2024-01-14' },
      { id: 3, email: 'emma@example.com', name: 'Emma Davis', age: 28, level: 'Advanced', lastClass: '2024-01-13' }
    ];
  });
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentAge, setNewStudentAge] = useState('');
  const [newStudentLevel, setNewStudentLevel] = useState('Beginner');

  // Reviews state synced with localStorage
  const [reviews, setReviews] = useState(() => {
    const saved = localStorage.getItem('instructorReviews');
    return saved ? JSON.parse(saved) : [
      { id: 1, studentName: 'Sarah Johnson', rating: 5, comment: 'Amazing class! The instructor is very patient and explains everything clearly.', date: '2024-01-15', response: 'Thank you Sarah! I\'m glad you enjoyed the class.' },
      { id: 2, studentName: 'Mike Chen', rating: 4, comment: 'Great beginner-friendly instruction. Looking forward to more classes!', date: '2024-01-14', response: 'Keep up the great work, Mike!' }
    ];
  });
  const [reviewResponse, setReviewResponse] = useState({});

  // Classes state synced with localStorage
  const [classes, setClasses] = useState(() => {
    const saved = localStorage.getItem('instructorClasses');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'Hip Hop Basics', date: '2024-01-20', time: '18:00', duration: '60 min', level: 'Beginner', enrolled: 8, maxCapacity: 15 },
      { id: 2, title: 'Contemporary Flow', date: '2024-01-21', time: '19:30', duration: '75 min', level: 'Intermediate', enrolled: 12, maxCapacity: 15 },
      { id: 3, title: 'Jazz Technique', date: '2024-01-22', time: '17:00', duration: '60 min', level: 'Advanced', enrolled: 6, maxCapacity: 12 }
    ];
  });
  const [newClass, setNewClass] = useState({ 
    title: '', 
    date: '', 
    time: '', 
    duration: '60 min',
    level: 'Beginner',
    maxCapacity: 15
  });

  // Save data to localStorage whenever changed
  useEffect(() => {
    localStorage.setItem('instructorStudents', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('instructorReviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('instructorClasses', JSON.stringify(classes));
  }, [classes]);

  // Add student handler
  const addStudent = () => {
    if (!newStudentEmail || !newStudentName || !newStudentAge) {
      setMessage('Please enter name, email, and age.');
      return;
    }
    if (students.some(s => s.email === newStudentEmail)) {
      setMessage('Student email already exists.');
      return;
    }
    const newStudent = {
      id: Date.now(),
      email: newStudentEmail,
      name: newStudentName,
      age: newStudentAge,
      level: newStudentLevel,
      lastClass: new Date().toISOString().split('T')[0]
    };
    setStudents(prev => [...prev, newStudent]);
    setNewStudentEmail('');
    setNewStudentName('');
    setNewStudentAge('');
    setNewStudentLevel('Beginner');
    setMessage('Student added successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const removeStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
    setMessage('Student removed successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  // Respond to review handler
  const respondToReview = (reviewId) => {
    const response = reviewResponse[reviewId];
    if (!response) {
      setMessage('Enter response before submitting.');
      return;
    }
    setReviews(prevReviews =>
      prevReviews.map(r => r.id === reviewId ? { ...r, response: response } : r)
    );
    setReviewResponse(prev => ({ ...prev, [reviewId]: '' }));
    setMessage('Response saved successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  // Add class handler
  const addClass = () => {
    if (!newClass.title || !newClass.date || !newClass.time) {
      setMessage('Please fill all required class fields.');
      return;
    }
    const newClassWithId = { 
      ...newClass, 
      id: Date.now(),
      enrolled: 0
    };
    setClasses(prev => [...prev, newClassWithId]);
    setNewClass({ 
      title: '', 
      date: '', 
      time: '', 
      duration: '60 min',
      level: 'Beginner',
      maxCapacity: 15
    });
    setMessage('Class created successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const deleteClass = (id) => {
    setClasses(classes.filter(c => c.id !== id));
    setMessage('Class deleted successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  // Calculate dashboard stats
  const totalStudents = students.length;
  const totalClasses = classes.length;
  const totalReviews = reviews.length;
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : 0;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Beginner': return '#10b981';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getLevelBadge = (level) => {
    return (
      <span 
        className="level-badge"
        style={{ backgroundColor: getLevelColor(level) }}
      >
        {level}
      </span>
    );
  };

  return (
    <div className="container page-wrapper">
      <div className="dashboard-header-section">
        <div className="header-content">
          <h1 className="dashboard-header">
            <span className="header-icon">👨‍🏫</span>
            Instructor Dashboard
          </h1>
          <p className="dashboard-subtitle">Manage your students, classes, and reviews</p>
        </div>
        
        {message && (
          <div className={`status-message ${message.includes('successfully') ? 'success' : 'info'}`}>
            <span className="status-icon">✓</span>
            {message}
          </div>
        )}
      </div>

      {/* Stats Overview */}
      <div className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon students">👥</div>
          <div className="stat-content">
            <h3 className="stat-number">{totalStudents}</h3>
            <p className="stat-label">Total Students</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon classes">📚</div>
          <div className="stat-content">
            <h3 className="stat-number">{totalClasses}</h3>
            <p className="stat-label">Active Classes</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon reviews">⭐</div>
          <div className="stat-content">
            <h3 className="stat-number">{totalReviews}</h3>
            <p className="stat-label">Reviews</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon rating">🏆</div>
          <div className="stat-content">
            <h3 className="stat-number">{averageRating}</h3>
            <p className="stat-label">Avg. Rating</p>
          </div>
        </div>
      </div>

      <nav className="tabs mb-16 card-shadow">
        <button className={`tab-button ${activeTab === 'students' ? 'active' : ''}`} onClick={() => setActiveTab('students')}>
          <span className="tab-icon">👥</span>
          Students
        </button>
        <button className={`tab-button ${activeTab === 'reviews' ? 'active' : ''}`} onClick={() => setActiveTab('reviews')}>
          <span className="tab-icon">⭐</span>
          Reviews
        </button>
        <button className={`tab-button ${activeTab === 'classes' ? 'active' : ''}`} onClick={() => setActiveTab('classes')}>
          <span className="tab-icon">📚</span>
          Classes
        </button>
      </nav>

      {activeTab === 'students' && (
        <section className="dashboard-grid grid grid-2">
          <div className="card-shadow add-section">
            <h3 className="section-header">
              <span className="section-icon">➕</span>
              Add New Student
            </h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Student Name</label>
                <input
                  type="text"
                  placeholder="Enter student name"
                  value={newStudentName}
                  onChange={e => setNewStudentName(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={newStudentEmail}
                  onChange={e => setNewStudentEmail(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  placeholder="Enter age"
                  value={newStudentAge}
                  onChange={e => setNewStudentAge(e.target.value)}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Skill Level</label>
                <select
                  value={newStudentLevel}
                  onChange={e => setNewStudentLevel(e.target.value)}
                  className="form-select"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <button onClick={addStudent} className="btn-primary">
                <span className="btn-icon">+</span>
                Add Student
              </button>
            </div>
          </div>

          <div className="card-shadow">
            <h3 className="section-header">
              <span className="section-icon">📋</span>
              Student Roster
            </h3>
            {students.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">👥</span>
                <p>No students yet. Add your first student to get started!</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Age</th>
                      <th>Level</th>
                      <th>Last Class</th>
                      <th className="actions-col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(student => (
                      <tr key={student.id} className="table-row">
                        <td>
                          <div className="student-info">
                            <div className="student-avatar">{student.name.charAt(0)}</div>
                            <span className="student-name">{student.name}</span>
                          </div>
                        </td>
                        <td>{student.email}</td>
                        <td>{student.age} years</td>
                        <td>{getLevelBadge(student.level)}</td>
                        <td>{formatDate(student.lastClass)}</td>
                        <td className="actions">
                          <button className="btn-danger" onClick={() => removeStudent(student.id)}>
                            <span className="btn-icon">×</span>
                            Remove
                          </button>
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

      {activeTab === 'reviews' && (
        <section>
          {reviews.length === 0 ? (
            <div className="card-shadow">
              <div className="empty-state">
                <span className="empty-icon">⭐</span>
                <p>No reviews yet. Reviews will appear here once students start rating your classes!</p>
              </div>
            </div>
          ) : (
            <div className="dashboard-grid grid grid-2">
              {reviews.map(review => (
                <div className="card-shadow review-card" key={review.id}>
                  <div className="review-header">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">{review.studentName.charAt(0)}</div>
                      <div>
                        <h4 className="reviewer-name">{review.studentName}</h4>
                        <span className="review-date">{formatDate(review.date)}</span>
                      </div>
                    </div>
                    <div className="review-rating">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`star ${i < review.rating ? 'filled' : 'empty'}`}>
                          ★
                        </span>
                      ))}
                      <span className="rating-text">({review.rating}/5)</span>
                    </div>
                  </div>
                  
                  <div className="review-comment">
                    <p>{review.comment}</p>
                  </div>
                  
                  {review.response && (
                    <div className="review-response">
                      <h5>Your Response:</h5>
                      <p>{review.response}</p>
                    </div>
                  )}
                  
                  <div className="review-actions">
                    <textarea
                      placeholder="Write your response to this review..."
                      value={reviewResponse[review.id] || ''}
                      onChange={e => setReviewResponse(prev => ({ ...prev, [review.id]: e.target.value }))}
                      className="response-textarea"
                      rows="3"
                    />
                    <button 
                      onClick={() => respondToReview(review.id)} 
                      className="btn-secondary"
                      disabled={!reviewResponse[review.id]}
                    >
                      {review.response ? 'Update Response' : 'Respond'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {activeTab === 'classes' && (
        <section className="dashboard-grid grid grid-2">
          <div className="card-shadow add-section">
            <h3 className="section-header">
              <span className="section-icon">➕</span>
              Create New Class
            </h3>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Class Title</label>
                <input
                  placeholder="Enter class title"
                  value={newClass.title}
                  onChange={e => setNewClass(prev => ({ ...prev, title: e.target.value }))}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  value={newClass.date}
                  onChange={e => setNewClass(prev => ({ ...prev, date: e.target.value }))}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Time</label>
                <input
                  type="time"
                  value={newClass.time}
                  onChange={e => setNewClass(prev => ({ ...prev, time: e.target.value }))}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Duration</label>
                <select
                  value={newClass.duration}
                  onChange={e => setNewClass(prev => ({ ...prev, duration: e.target.value }))}
                  className="form-select"
                >
                  <option value="45 min">45 min</option>
                  <option value="60 min">60 min</option>
                  <option value="75 min">75 min</option>
                  <option value="90 min">90 min</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Skill Level</label>
                <select
                  value={newClass.level}
                  onChange={e => setNewClass(prev => ({ ...prev, level: e.target.value }))}
                  className="form-select"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Max Capacity</label>
                <input
                  type="number"
                  placeholder="Enter max capacity"
                  value={newClass.maxCapacity}
                  onChange={e => setNewClass(prev => ({ ...prev, maxCapacity: parseInt(e.target.value) }))}
                  className="form-input"
                />
              </div>
              <button onClick={addClass} className="btn-primary">
                <span className="btn-icon">+</span>
                Create Class
              </button>
            </div>
          </div>

          <div className="card-shadow">
            <h3 className="section-header">
              <span className="section-icon">📅</span>
              Scheduled Classes
            </h3>
            {classes.length === 0 ? (
              <div className="empty-state">
                <span className="empty-icon">📚</span>
                <p>No classes scheduled. Create your first class to get started!</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th>Date & Time</th>
                      <th>Level</th>
                      <th>Enrollment</th>
                      <th className="actions-col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map(cls => (
                      <tr key={cls.id} className="table-row">
                        <td>
                          <div className="class-info">
                            <h4 className="class-title">{cls.title}</h4>
                            <span className="class-duration">{cls.duration}</span>
                          </div>
                        </td>
                        <td>
                          <div className="class-time">
                            <span className="class-date">{formatDate(cls.date)}</span>
                            <span className="class-time-text">{cls.time}</span>
                          </div>
                        </td>
                        <td>{getLevelBadge(cls.level)}</td>
                        <td>
                          <div className="enrollment-info">
                            <span className="enrollment-text">{cls.enrolled}/{cls.maxCapacity}</span>
                            <div className="enrollment-bar">
                              <div 
                                className="enrollment-fill"
                                style={{ width: `${(cls.enrolled / cls.maxCapacity) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="actions">
                          <button className="btn-danger" onClick={() => deleteClass(cls.id)}>
                            <span className="btn-icon">×</span>
                            Delete
                          </button>
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
    </div>
  );
}

export default InstructorDashboard;
