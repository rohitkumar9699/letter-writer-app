const express = require('express');
const { google } = require('googleapis');
const router = express.Router();

// Middleware to ensure the user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

// Save letter to Google Drive as a Google Doc
router.post('/save', ensureAuthenticated, async (req, res) => {
  try {
    const { title, content } = req.body;
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: req.user.accessToken });

    // Create Google Docs service client
    const docs = google.docs({ version: 'v1', auth: oauth2Client });

    // Create a new document
    const createResponse = await docs.documents.create({
      requestBody: {
        title: title || 'Untitled Letter'
      }
    });

    const documentId = createResponse.data.documentId;

    // Update document content
    await docs.documents.batchUpdate({
      documentId: documentId,
      requestBody: {
        requests: [
          {
            insertText: {
              location: { index: 1 },
              text: content || ''
            }
          }
        ]
      }
    });

    res.json({ message: 'Letter saved to Google Drive!', documentId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error saving letter', error: error.message });
  }
});

// List Google Docs files (letters)
router.get('/list', ensureAuthenticated, async (req, res) => {
  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: req.user.accessToken });

    const drive = google.drive({ version: 'v3', auth: oauth2Client });

    const response = await drive.files.list({
      q: "mimeType='application/vnd.google-apps.document'",
      fields: 'files(id, name, createdTime)'
    });

    res.json(response.data.files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving letters', error: error.message });
  }
});

module.exports = router;
