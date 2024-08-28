const { FindTalentPage } = require('./findTalentFunc');

module.exports = {
    LoginPage: require('./loginFunc').LoginPage,
    HomePage: require('./homeFunc').HomePage,
    MyProfilePage: require('./myProfileFunc').MyProfilePage,
    MyContactsPage: require('./myContactsFunc').MyContactsPage,
    FindTalentPage: require('./findTalentFunc').FindTalentPage,
    QuickTasksPage : require('./quickTasksFunc').QuickTasksPage,
    EmployeesPage : require('./employeeFunc').EmployeesPage
}
