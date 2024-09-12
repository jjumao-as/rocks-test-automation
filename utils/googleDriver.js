const gmailTester = require('gmail-tester');
const path = require('path');

async function googleAPI(mailSubject, mailfrom, timeout = 60000) {
    const checkInboxPromise = gmailTester.check_inbox(
        path.resolve(__dirname, '../testdata/credentials.json'),
        path.resolve(__dirname, '../testdata/token.json'),
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

module.exports = { googleAPI };