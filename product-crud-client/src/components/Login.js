import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await axios.post('http://localhost:5000/api/users/login', formData);
      setMessage('✅ Login successful!');
      setFormData({ username: '', password: '' });
    } catch (error) {
      setMessage('❌ Login failed. Please check your credentials.');
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 15px',
    margin: '8px 0 20px 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: '18px',
    cursor: 'pointer',
    fontWeight: '600',
  };

  const formContainer = {
    maxWidth: '400px',
    margin: '60px auto',
    padding: '30px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
    borderRadius: '12px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fff',
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    color: '#333',
  };

  const messageStyle = {
    textAlign: 'center',
    marginBottom: '20px',
    color: message.startsWith('✅') ? 'green' : 'red',
    fontWeight: '600',
  };

  return (
    <div style={formContainer}>
      <h2 style={headerStyle}>Login to Your Account</h2>
      {message && <div style={messageStyle}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={e => setFormData({ ...formData, username: e.target.value })}
          required
          autoComplete="username"
          disabled={loading}
        />
        <input
          style={inputStyle}
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={e => setFormData({ ...formData, password: e.target.value })}
          required
          autoComplete="current-password"
          disabled={loading}
        />
        <button style={buttonStyle} type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
