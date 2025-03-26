// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Editor from './Editor';
// import Login from './Login';
// import "./index.css"

// const url = process.env.REACT_APP_BACKEND_URL || 'https://letter-writer-app-backend.vercel.app';


// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     // Check if user is authenticated

//     // axios.get('http://localhost:5000/auth/status', { withCredentials: true })
//     axios.get(`${url}/auth/status`, { withCredentials: true })
//       .then(response => {
//         setUser(response.data.user);
//       })
//       .catch(() => {
//         setUser(null);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Letter Writer App</h1>
//       {user ? (
//         <>
//           <div className='welcome-container'>
//             <p>Welcome, {user.displayName}</p>
//             {/* <a href="http://localhost:5000/auth/logout">Logout</a> */}
//             <a href={`${url}/auth/logout`}>Logout</a>
            
//           </div>
//           <Editor />
//         </>
//       ) : (
//         <Login />
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Editor from './Editor';
import Login from './Login';
import "./index.css";

const url = process.env.REACT_APP_BACKEND_URL || 'https://letter-writer-app-backend.vercel.app';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const isHome = window.location.pathname === '/home';

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(`${url}/auth/status`, { 
          withCredentials: true 
        });
        if (response.data.user) {
          setUser(response.data.user);
          if (!isHome) {
            window.location.pathname = '/home';
          }
        } else if (isHome) {
          window.location.pathname = '/';
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setUser(null);
        if (isHome) {
          window.location.pathname = '/';
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [isHome]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isHome) {
    return user ? (
      <div>
        <h1>Letter Writer App</h1>
        <div className='welcome-container'>
          <p>Welcome, {user.displayName || "User"}</p>
          <a href={`${url}/auth/logout`}>Logout</a>
        </div>
        <Editor />
      </div>
    ) : null;
  }

  return <Login />;
}

export default App;