const { AdminDashboardPage } = require('./adminDashboardFunc');
const { FindTalentPage } = require('./findTalentFunc');

module.exports = {
    LoginPage: require('./loginFunc').LoginPage,
    HomePage: require('./homeFunc').HomePage,
    MyProfilePage: require('./myProfileFunc').MyProfilePage,
    MyContactsPage: require('./myContactsFunc').MyContactsPage,
    FindTalentPage: require('./findTalentFunc').FindTalentPage,
    AdminDashboardPage: require('./adminDashboardFunc').AdminDashboardPage,
    QuickTasksPage: require('./quickTasksFunc').QuickTasksPage,
    ManageClientsPage: require('./manageClientsFunc').ManageClientsPage,
}
    