const gmailTester = require('gmail-tester');
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const CREDENTIALS_PATH = path.resolve(__dirname, '../testdata/credentials.json'); // credentials path
const TOKEN_PATH = path.join(__dirname, '../testdata/token.json');

async function googleAPI(mailSubject, mailfrom, mailTo, timeout = 60000) {
    const checkInboxPromise = gmailTester.check_inbox(
        CREDENTIALS_PATH,
        TOKEN_PATH,
        {
            subject: mailSubject,
            from: mailfrom,
            to: process.env.GOOGLE_EMAIL,
            include_body: true,
        }
    );
    const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), timeout)
    );

    try {
        const email = await Promise.race([checkInboxPromise, timeoutPromise]);
        return email;
    } catch (error) {
        return null;
    }
}

async function refresh_access_token() {
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));
    const token = JSON.parse(fs.readFileSync(TOKEN_PATH));

    const { client_id, client_secret, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0]
    );

    // Set the current token
    oAuth2Client.setCredentials(token);

    async function refreshToken() {
        try {
            // Refresh the token
            const newToken = await oAuth2Client.getAccessToken();

            // Update the token file
            fs.writeFileSync(TOKEN_PATH, JSON.stringify({
                ...token,
                access_token: newToken.token
            }, null, 2));
        } catch (error) {
            console.error('Error refreshing token:', error);
        }
    }

    refreshToken();

}

module.exports = { googleAPI, refresh_access_token };