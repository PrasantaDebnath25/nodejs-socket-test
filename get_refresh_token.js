const {google} = require('googleapis');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Replace with your client ID and client secret
const CLIENT_ID = '447705770380-9dp0nq6nbsh8b6ndut3qthu29nfa4g1i.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URL = "http://localhost:3001/"
// Replace with the scopes you need access to
const SCOPES = [
  'https://www.googleapis.com/auth/drive.readonly',
  'https://www.googleapis.com/auth/gmail.readonly',
];

// Replace with the file path where you want to store the refresh token
const TOKEN_PATH = 'PATH_TO_REFRESH_TOKEN_FILE.json';

// Create an OAuth2 client with the client ID and client secret
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET,REDIRECT_URL);

// Create a function to prompt the user to authorize the app and obtain the refresh token
async function getRefreshToken() {
  // Generate the authorization URL
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  // Output the authorization URL to the console and prompt the user to visit it
  console.log(`Authorize this app by visiting this URL: ${authUrl}`);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  const code = await new Promise(resolve => rl.question('Enter the authorization code: ', resolve));

  // Exchange the authorization code for an access token and refresh token
  const {tokens} = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);

  // Write the refresh token to a file for future use
  fs.writeFile(TOKEN_PATH, JSON.stringify(tokens.refresh_token), (err) => {
    if (err) return console.error(err.message);
    console.log('Refresh token stored in', TOKEN_PATH);
  });
}

getRefreshToken();
