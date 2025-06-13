import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/login';
import Dashboard from './components/dashboard';
import CalendarPage from './components/Calendar';
import ProgressPage from './components/Progress';
import ReminderForm from './components/ReminderForm';

function App() {
  const [userName, setUserName] = useState('');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setUserName={setUserName} />} />
        <Route path="/dashboard" element={<Dashboard userName={userName} />} />
        <Route path="/dashboard/calendar" element={<CalendarPage />} />
        <Route path="/dashboard/reminder" element={<ReminderForm />} />
        <Route path="/dashboard/progress" element={<ProgressPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
