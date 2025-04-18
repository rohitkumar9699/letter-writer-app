import React from 'react';
// import "./index.css";
import './login.css'
const url = process.env.REACT_APP_BACKEND_URL || 'https://letter-writer-app-backend.vercel.app';

function Login() {
  return (
    <div >
       <div className="login-container">
       <h2>Letter Writer App</h2>
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

       <button> <a 
        href={`${url}/auth/google`} 
        className="login-button"
      > Login with Google </a></button>
     </div>
    </div>
  );
}

export default Login;