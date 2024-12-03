import path from 'path';
import fs from 'fs';
const axios = require('axios');

// Load credentials
function loadCredentials() {
    const CREDENTIALS_PATH = path.resolve(__dirname, '../testdata/credentials.json');
    const credentials = JSON.parse(fs.readFileSync(CREDENTIALS_PATH));

    const { client_id, client_secret, redirect_uris, refresh_token } = credentials;
    return {
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: redirect_uris,
        refresh_token: refresh_token
    };
}

// Refresh access token
async function refreshAccessToken() {
    const credentials = loadCredentials();
    try {
        const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', null, {
            params: {
                'grant_type': 'refresh_token',
                'client_id': credentials.client_id,
                'client_secret': credentials.client_secret,
                'refresh_token': credentials.refresh_token
            }
        });
        const newAccessToken = response.data.access_token;
        return newAccessToken; // Return new access token
    } catch (error) {
        console.error('Error generating token:', error.response ? error.response.data : error.message);
    }
}

async function getAccountID(token) {
    const acctId = await axios.get('https://mail.zoho.com/api/v1/accounts', {
        headers: {
            'Authorization': `Zoho-oauthtoken ${token}`,
        }
    });

    return acctId.data.data[0].accountId;
}

async function searchEmail(acctID, token, query) {
    const response = await axios.get(`https://mail.zoho.com/api/v1/accounts/${acctID}/messages/search`, {
        headers: {
            'Authorization': `Zoho-oauthtoken ${token}`
        },
        params: {
            searchKey: query,
            limit : 1
        }
    });

    const data = await response.data;
    return {
        subject : data.data[0].subject,
        folderId : data.data[0].folderId,
        messageId : data.data[0].messageId
    };
}

// Get the latest email based on search criteria
async function getLatestEmail(subject, from) {
    const accessToken = await refreshAccessToken();
    const query = `subject:"${subject}"::sender:${from}`;

    const generatedAcctId = await getAccountID(accessToken);
    const messageDetails = await searchEmail(generatedAcctId, accessToken, query);

    const folderId = messageDetails.folderId;
    const messageId = messageDetails.messageId;

    try {
        const message = await axios.get(`https://mail.zoho.com/api/accounts/${generatedAcctId}/folders/${folderId}/messages/${messageId}/content`, {
            headers: {
                'Authorization': `Zoho-oauthtoken ${accessToken}`
            }
        });
        const messageContent = await message.data;
        if (messageContent) {
            const latestEmail = messageContent.data; // Get the latest email
            return {
                subject: messageDetails.subject,
                content: latestEmail.content
            };
        } else {
            console.log('No emails found matching the query.');
            return null;
        }
    } catch (error) {
        console.error('Error fetching message content:', error.response ? error.response.data : error.message);
        return null;
    }
}

module.exports = { getLatestEmail };
