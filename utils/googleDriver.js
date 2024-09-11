const gmailTester = require('gmail-tester');
const path = require('path');

async function googleAPI() {
    const email = await gmailTester.check_inbox(
        path.resolve(__dirname, '../testdata/credentials.json'),
        path.resolve(__dirname, '../testdata/token.json'),
        {
            subject: "Welcome to Full Scale!",
            from: "noreply@fullscale.io",
            include_body: true,
        }
    )
    return email;;
}

module.exports = { googleAPI };