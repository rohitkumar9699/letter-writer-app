// import React from 'react';
// import './login.css'
// const url = process.env.REACT_APP_BACKEND_URL || 'https://letter-writer-app-backend.vercel.app';
// // const url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';


// function Login() {
//   const handleLogin = () => {
//     // Redirect to back-end Google OAuth endpoint
//     window.location.href = `${url}/auth/google`;
//   };

//   return (
//     <div>
//       {/* <h2>Login</h2> */}
//       <div class="features">
//         <h2>Key Features</h2>
//           <ul>
//               <li>Google OAuth Login</li>
//               <li>Rich Text Editing</li>
//               <li>Auto-Save to Google Drive</li>
//               <li>Easy Access & Management</li>
//               <li>Responsive & Modern UI</li>
//           </ul>
//       </div>

//       <button onClick={handleLogin}>Sign in with Google</button>
//     </div>
//   );
// }

// export default Login;


import React from 'react';
import "./index.css";

const url = process.env.REACT_APP_BACKEND_URL || 'https://letter-writer-app-backend.vercel.app';

function Login() {
  return (
    <div className="login-container">
      <h2>Letter Writer App</h2>
      <a 
        href={`${url}/auth/google`} 
        className="login-button"
      >
        Login with Google
      </a>
    </div>
  );
}

export default Login;