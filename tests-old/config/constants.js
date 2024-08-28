const CONSTANTS = {
    ENVIRONMENTS : {
        DEV: "https://dev.fullscale.rocks/login",
        PREPROD: "https://preprod.fullscale.rocks/login",
        PROD: "https://fullscale.rocks/login"
    },
    ROLES: [
        'SUPER_ADMIN',
        'ADMIN',
        'HR',
        'FLOOR',
        'SALES',
        'WRITER',
        'EMPLOYEE',
        'FINANCE'
    ]
}
Object.freeze(CONSTANTS)

module.exports = CONSTANTS