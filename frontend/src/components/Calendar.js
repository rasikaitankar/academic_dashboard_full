// import React, { useState } from 'react';

// export default function Calendar() {
//   const [title, setTitle] = useState('');
//   const [datetime, setDatetime] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch('http://localhost:5000/api/reminders', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ title, datetime, email }),
//     });

//     const data = await res.json();
//     if (data.success) {
//       setMessage('Reminder saved and email scheduled!');
//       setTitle('');
//       setDatetime('');
//       setEmail('');
//     } else {
//       setMessage('Failed to set reminder.');
//     }
//   };

//   return (
//     <div style={{ padding: '1rem' }}>
//       <h2>📅 Set a Calendar Reminder</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Reminder Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />
//         <br />
//         <input
//           type="datetime-local"
//           value={datetime}
//           onChange={(e) => setDatetime(e.target.value)}
//           required
//         />
//         <br />
//         <input
//           type="email"
//           placeholder="Your Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <br />
//         <button type="submit">Set Reminder</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarPage = () => {
  const [date, setDate] = React.useState(new Date());

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📅 Select a date:</h2>
      <Calendar onChange={setDate} value={date} />
      <p>Selected date: {date.toString()}</p>
    </div>
  );
};

export default CalendarPage;
