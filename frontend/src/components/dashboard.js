import React, { useEffect, useState } from 'react';
import Calendar from './Calendar';
import ReminderForm from './ReminderForm';
import Progress from './Progress';
import './Dashboard.css';

const Dashboard = ({ userName }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (activeTab === 'notes') {
      fetch('http://localhost:5000/api/about')
        .then(res => res.json())
        .then(data => setNotesList(data.notes))
        .catch(() => setError('Error fetching notes.'));
    }
  }, [activeTab]);

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName, note }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setNotesList([...notesList, { name: userName, note }]);
          setNote('');
        } else {
          throw new Error();
        }
      })
      .catch(() => setError('Failed to save note.'));
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'notes':
        return (
          <div className="card fade-in">
            <form onSubmit={handleNoteSubmit}>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Write a note..."
                rows="4"
                cols="50"
                style={{
                  width: '100%',
                  borderRadius: '8px',
                  padding: '10px',
                  fontSize: '1rem'
                }}
              />
              <br />
              <button className="primary-btn" type="submit">➕ Add Note</button>
            </form>

            <h2 style={{ marginTop: '1rem' }}>📝 All Notes</h2>
            <ul>
              {notesList.map((n, idx) => (
                <li key={idx}><strong>{n.name}</strong>: {n.note}</li>
              ))}
            </ul>

            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        );

      case 'calendar':
        return <div className="card fade-in"><Calendar /></div>;

      case 'reminder':
        return <div className="card fade-in"><ReminderForm /></div>;

      case 'progress':
        return <div className="card fade-in"><Progress /></div>;

      case 'home':
      default:
        return (
          <div className="card fade-in">
            <p>This is your landing dashboard. Use the navbar to navigate between Notes, Calendar, Reminders, and Progress.</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-wrapper">
      <nav className="navbar">
        {['home', 'notes', 'calendar', 'reminder', 'progress'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`nav-btn ${activeTab === tab ? 'active' : ''}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </nav>

      <h1 style={{ color: '#fff', marginBottom: '1rem' }}>👋 Hello, {userName}</h1>
      {renderContent()}
    </div>
  );
};

export default Dashboard;
