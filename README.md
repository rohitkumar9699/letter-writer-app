# Letter Writer Application

This full-stack web application allows users to sign in with Google, create/edit letters, and save them as Google Docs in their Google Drive.

## Features
- Google OAuth authentication using Passport.js
- Simple text editor for drafting letters
- Save letters to Google Drive as Google Docs
- REST API built with Node.js and Express
- Front-end built with React

## Technology Stack
- **Front-end:** React
- **Back-end:** Node.js with Express
- **Authentication:** Google OAuth
- **Google API:** Google Drive API integration

## Setup
1. Rename `.env.example` to `.env` and fill in your credentials.
2. Install dependencies in both `client` and `server` directories.
3. Start the server (`npm run dev` inside the server folder) and the client (`npm start` inside the client folder).




Here’s a list of the **packages** used in your project:  

### **Backend (`server/`)**
1. **Core Packages:**
   - `express` → Web framework for handling routes & middleware
   - `cors` → Enables Cross-Origin Resource Sharing (for frontend communication)
   - `dotenv` → Loads environment variables from `.env`
   - `nodemon` (dev) → Automatically restarts the server on file changes  

2. **Authentication:**
   - `passport` → Authentication middleware
   - `passport-google-oauth20` → Google OAuth strategy for Passport  
   - `express-session` → Session management (storing user sessions)  

3. **Google Drive API:**
   - `googleapis` → Provides access to Google APIs (used for Drive storage)  

4. **Database (if used):**
   - `mongoose` (for MongoDB) → ODM for MongoDB  
   - OR  
   - `mysql2` (for MySQL) → MySQL database driver  

5. **Other Utilities:**
   - `morgan` (dev) → HTTP request logger  
   - `bcryptjs` (if password hashing is needed)  
   - `jsonwebtoken` (if JWT authentication is used instead of sessions)  

---

### **Frontend (`client/`)**
1. **Core Libraries:**
   - `react` → Frontend framework  
   - `react-dom` → Rendering UI components  
   - `react-router-dom` → Routing for single-page apps  
   - `axios` → HTTP client for API requests  

2. **Authentication:**
   - `firebase` (if using Firebase Auth for Google OAuth)  

3. **Rich Text Editing (if used):**
   - `react-quill` → Rich text editor  
   - OR  
   - `draft-js` → Another editor alternative  

4. **State Management (if used):**
   - `redux` → State management  
   - `react-redux` → Redux bindings for React  
   - `@reduxjs/toolkit` → Modern Redux utilities  

5. **Styling:**
   - `tailwindcss` (if used) → Utility-first CSS framework  
   - `styled-components` (if using styled components)  

---

### **Deployment & Dev Tools**
1. **Backend Deployment:**
   - `vercel` / `heroku` / `aws-sdk` (depending on cloud provider)  

2. **Frontend Deployment:**
   - `vite` (if using Vite instead of CRA)  

---

### **Check Installed Packages**
To see all installed packages, run:
```sh
npm list --depth=0
```
Let me know if you need any modifications! 🚀
