import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './signup.css';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false); 

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError('');

    if (username === '' || email === '' || password === '') {
      setError('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const postData = {
        username,
        email,
        password,
      };
      
      const response = await axios.post('http://localhost:4000/register', postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        setIsSignedUp(true); 
      } else {
        setError('Failed to sign up. Please try again later.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      setError('Failed to sign up. Please try again later.');
    }
  };

  if (isSignedUp) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="login-container3">
      <h2 className='login-header'>Start your journey with us</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-group3">
          <label className="username3" htmlFor="username">Username:</label>
          <input
           className='user-input3'
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group3">
          <label className="email3" htmlFor="email">Email:</label>
          <input
            className='user-input3'
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group3">
          <label className="password3" htmlFor="password">Password:</label>
          <input
            className='user-input3'
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="error3">{error}</p>}
        <button className="button3" type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
