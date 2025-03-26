import React, { useState } from 'react';
import axios from 'axios';
import './editor.css';

const url = process.env.REACT_APP_BACKEND_URL || 'https://letter-writer-app-backend.vercel.app';

function Editor() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setMessage('Please enter both title and content');
      return;
    }

    setIsSaving(true);
    setMessage('');

    try {
      const response = await axios.post(
        `${url}/letters/save`, 
        { title, content }, 
        { 
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.success) {
        setMessage('Letter saved successfully!');
        setTitle('');
        setContent('');
      } else {
        setMessage(response.data.message || 'Failed to save letter');
      }
    } catch (error) {
      console.error('Save error:', error);
      setMessage(error.response?.data?.message || 'Error saving letter');
    } finally {
      setIsSaving(false);
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
        className="editor-input"
        disabled={isSaving}
      />
      <textarea
        placeholder="Write your letter here..."
        value={content}
        onChange={e => setContent(e.target.value)}
        className="editor-textarea"
        disabled={isSaving}
      />
      <button 
        onClick={handleSave} 
        className="save-button"
        disabled={isSaving}
      >
        {isSaving ? 'Saving...' : 'Save to Google Drive'}
      </button>
      {message && (
        <p className={`message ${message.includes('success') ? 'success' : 'error'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default Editor;