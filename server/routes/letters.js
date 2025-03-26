const express = require('express');
const { google } = require('googleapis');
const router = express.Router();

// Middleware to ensure authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

// Helper function for Letters folder
async function getOrCreateLettersFolder(auth) {
  const drive = google.drive({ version: 'v3', auth });
  
  try {
    const folderResponse = await drive.files.list({
      q: "name='Letters' and mimeType='application/vnd.google-apps.folder' and trashed=false",
      fields: 'files(id)',
    });

    if (folderResponse.data.files.length > 0) {
      return folderResponse.data.files[0].id;
    }

    const folder = await drive.files.create({
      requestBody: {
        name: 'Letters',
        mimeType: 'application/vnd.google-apps.folder',
      },
      fields: 'id',
    });

    return folder.data.id;
  } catch (error) {
    console.error('Error in getOrCreateLettersFolder:', error);
    throw error;
  }
}

// Save letter endpoint
router.post('/save', ensureAuthenticated, async (req, res) => {
  try {
    // Add validation for request body
    if (!req.body || !req.body.title || !req.body.content) {
      return res.status(400).json({ message: "Title and content are required" });
    }

    const { title, content } = req.body;
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: req.user.accessToken });

    const folderId = await getOrCreateLettersFolder(oauth2Client);
    const docs = google.docs({ version: 'v1', auth: oauth2Client });

    const createResponse = await docs.documents.create({
      requestBody: { title: title || 'Untitled Letter' }
    });

    const documentId = createResponse.data.documentId;

    await docs.documents.batchUpdate({
      documentId: documentId,
      requestBody: {
        requests: [{
          insertText: {
            location: { index: 1 },
            text: content || ''
          }
        }]
      }
    });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    await drive.files.update({
      fileId: documentId,
      addParents: folderId,
      fields: 'id, parents'
    });

    res.json({ 
      success: true,
      message: 'Letter saved to Google Drive!', 
      documentId 
    });
  } catch (error) {
    console.error('Error in /save:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error saving letter', 
      error: error.message 
    });
  }
});

// List letters endpoint
router.get('/list', ensureAuthenticated, async (req, res) => {
  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: req.user.accessToken });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    const folderId = await getOrCreateLettersFolder(oauth2Client);

    const response = await drive.files.list({
      q: `mimeType='application/vnd.google-apps.document' and '${folderId}' in parents and trashed=false`,
      fields: 'files(id, name, createdTime, webViewLink)'
    });

    res.json({ 
      success: true,
      files: response.data.files 
    });
  } catch (error) {
    console.error('Error in /list:', error);
    res.status(500).json({ 
      success: false,
      message: 'Error retrieving letters', 
      error: error.message 
    });
  }
});

module.exports = router;