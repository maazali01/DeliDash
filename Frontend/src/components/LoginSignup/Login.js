import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import Popup from './popup/view/popup';
import Cookie from "js-cookie"

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loggedInPopup, setLoggedInPopup] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (username === '' || password === '') {
      setError('Username and Password are required.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      const postData = {
        username,
        password,
      };

      const response = await axios.post('http://localhost:4000/login', postData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);
      const { user } = response.data;

      Cookie.set('token', response.data.token);

      setLoggedInPopup(true);
      setTimeout(() => {
        setLoggedInPopup(false);
        if (user.role === 'admin') {
          navigate('/admin', { state: user });
        } else {
          window.location.href = '/';
        }
      }, 2000);

    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <>
      {loggedInPopup && (<Popup message="Logged in" />)}
      <div className="login-container2">
        <h2 className='login-header'>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group2">
            <label className="username2" htmlFor="username">Username:</label>
            <input
              className='user-input2'
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group2">
            <label className="password2" htmlFor="password">Password:</label>
            <input
              className='user-input2'
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error2">{error}</p>}
          <button className="button1" type="submit">Login</button>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
