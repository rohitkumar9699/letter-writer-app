// import React from 'react';
// import './index.css';

// function Login() {
//   const handleLogin = () => {
//     // Redirect to back-end Google OAuth endpoint
//     window.location.href = 'http://localhost:5000/auth/google';
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <button onClick={handleLogin}>Sign in with Google</button>
//     </div>
//   );
// }

// export default Login;


import React from 'react';

function Login() {
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f8f9fa',
    },
    heading: {
      fontSize: '24px',
      color: '#333',
      marginBottom: '20px',
    },
    button: {
      padding: '10px 20px',
      fontSize: '16px',
      fontWeight: 'bold',
      color: 'white',
      backgroundColor: '#db4437', // Google's red
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background 0.3s ease-in-out',
    },
    buttonHover: {
      backgroundColor: '#c1351d',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Login</h2>
      <button
        style={styles.button}
        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
        onClick={handleLogin}
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
