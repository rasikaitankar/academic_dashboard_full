import React, { useState } from 'react';
import Dashboard from '../components/dashboard';
import './Login.css'; // 🔁 Create this CSS file

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
      setUserName(data.name);
      setIsLoggedIn(true);
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  if (isLoggedIn) {
    return <Dashboard userName={userName} />;
  }

  return (
    <div className="login-container">
      <div className="login-card fade-in">
        <h2>🎓 Academic Dashboard Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">🔐 Login</button>
        </form>
        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
