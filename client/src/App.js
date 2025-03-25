import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Editor from './Editor';
import Login from './Login';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is authenticated
    axios.get('http://localhost:5000/auth/status', { withCredentials: true })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(() => {
        setUser(null);
      });
  }, []);

  return (
    <div>
      <h1>Letter Writer App</h1>
      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <a href="http://localhost:5000/auth/logout">Logout</a>
          <Editor />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
