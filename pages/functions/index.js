const { FindTalentPage } = require('./findTalentFunc');
const { ViewFeedbackPage } = require('./viewFeedbackFunc');

module.exports = {
    LoginPage: require('./loginFunc').LoginPage,
    HomePage: require('./homeFunc').HomePage,
    MyProfilePage: require('./myProfileFunc').MyProfilePage,
    MyContactsPage: require('./myContactsFunc').MyContactsPage,
    FindTalentPage: require('./findTalentFunc').FindTalentPage,
    SubmitFeedbackPage : require('./submitFeedbackFunc').SubmitFeedbackPage,
    ViewFeedbackPage : require('./viewFeedbackFunc').ViewFeedbackPage
}
    