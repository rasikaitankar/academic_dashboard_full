import React, { useState } from 'react';

const Reminder = ({ userName }) => {
  const [title, setTitle] = useState('');
  const [datetime, setDatetime] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/reminders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, datetime, email }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage('✅ Reminder set successfully!');
      setTitle('');
      setDatetime('');
      setEmail('');
    } else {
      setMessage('❌ Failed to set reminder.');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>⏰ Set a Reminder</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={title}
            placeholder="Reminder Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            value={email}
            placeholder="Your Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Set Reminder</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Reminder;
