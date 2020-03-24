const { google } = require('googleapis');
const credentials = JSON.parse(process.env.CREDENTIALS)

const scopes = [
  'https://www.googleapis.com/auth/drive'
];
const auth = new google.auth.JWT(
  credentials.client_email, null,
  credentials.private_key, scopes
);

const drive = google.drive({ version: "v3", auth });

module.exports = getEm = async () => {
  try {
    params = { q: "mimeType = 'application/vnd.google-apps.map'", pageSize: 30 }
    res = await drive.files.list(params)
    list = await res.data.files
    ids = await list.map(file => file.id)
    return await ids
  } catch(e) {
    console.log(e)
  }
}