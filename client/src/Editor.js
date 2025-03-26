// import React, { useState } from 'react';
// import axios from 'axios';
// import './editor.css';

// const url = process.env.REACT_APP_BACKEND_URL || 'https://letter-writer-app-backend.vercel.app';


// function Editor() {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSave = async () => {
//     try {
//       const response = await axios.post(`${url}/letters/save`, { title, content }, { withCredentials: true });
//       setMessage(response.data.message);
//     } catch (error) {
//       console.error(error);
//       setMessage('Error saving letter.');
//     }
//   };

//   return (
//     <div className="editor-container">
//       <h2>Create a Letter</h2>
//       <input
//         type="text"
//         placeholder="Letter Title"
//         value={title}
//         onChange={e => setTitle(e.target.value)}
//       />
//       <br />
//       <textarea
//         rows="10"
//         cols="50"
//         placeholder="Write your letter here..."
//         value={content}
//         onChange={e => setContent(e.target.value)}
//       />
//       <br />
//       <button onClick={handleSave}>Save to Google Drive</button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

// export default Editor;



import React, { useState } from 'react';
import axios from 'axios';
import './editor.css';

// const url = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
const url = process.env.REACT_APP_BACKEND_URL || 'https://letter-writer-app-backend.vercel.app';

function Editor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setMessage('Title and content cannot be empty.');
      return;
    }

    try {
      const response = await axios.post(
        `${url}/letters/save`, 
        { title, content }, 
        { withCredentials: true }
      );
      setMessage(response.data.message);
      setTitle('');
      setContent('');
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Error saving letter.');
    }
  };

  return (
    <div className="editor-container">
      <h2>Create a Letter</h2>
      <input
        type="text"
        placeholder="Letter Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <br />
      <textarea
        rows="10"
        cols="50"
        placeholder="Write your letter here..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <br />
      <button onClick={handleSave}>Save to Google Drive</button>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Editor;
