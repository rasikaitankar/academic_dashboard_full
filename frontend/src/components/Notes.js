import React, { useEffect, useState } from 'react';

const Dashboard = ({ userName }) => {
  const [note, setNote] = useState('');
  const [notesList, setNotesList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/about')
      .then(res => res.json())
      .then(data => setNotesList(data.notes))
      .catch(() => setError('Error fetching notes.'));
  }, []);

  const handleNoteSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: userName, note })
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

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Hello, {userName}</h1>

      <form onSubmit={handleNoteSubmit}>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Write a note..."
          rows="4"
          cols="50"
        />
        <br />
        <button type="submit">Add Note</button>
      </form>

      <h2>All Notes</h2>
      <ul>
        {notesList.map((n, idx) => (
          <li key={idx}><strong>{n.name}</strong>: {n.note}</li>
        ))}
      </ul>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Dashboard;
