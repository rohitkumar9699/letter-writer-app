import React from 'react';
import './login.css'
const url = 'https://letter-writer-app-backend.vercel.app'


function Login() {
  const handleLogin = () => {
    // Redirect to back-end Google OAuth endpoint
    window.location.href = `${url}/auth/google`;
  };

  return (
    <div>
      {/* <h2>Login</h2> */}
      <div class="features">
        <h2>Key Features</h2>
          <ul>
              <li>Google OAuth Login</li>
              <li>Rich Text Editing</li>
              <li>Auto-Save to Google Drive</li>
              <li>Easy Access & Management</li>
              <li>Responsive & Modern UI</li>
          </ul>
      </div>

      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
}

export default Login;
