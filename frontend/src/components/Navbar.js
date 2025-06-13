import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav style={{ padding: '1rem', backgroundColor: '#f0f0f0' }}>
    <Link to="/dashboard" style={{ margin: '0 10px' }}>Dashboard</Link>
    <Link to="/notes" style={{ margin: '0 10px' }}>Notes</Link>
    <Link to="/calendar" style={{ margin: '0 10px' }}>Calendar</Link>
    <Link to="/progress" style={{ margin: '0 10px' }}>Progress</Link>
  </nav>
);

export default Navbar;
