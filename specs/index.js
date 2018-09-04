/* Specs will follow the order below */

/* Hooks */
require('./hooks.js')

/* User Account */
require('./resources/v1/users/account/signup.spec.js')
require('./resources/v1/users/auth/jwt.spec.js')
require('./resources/v1/users/account/activation.spec.js')
require('./resources/v1/users/auth/local.spec.js')
require('./resources/v1/users/account/name.spec.js')
require('./resources/v1/users/account/index.spec.js')
require('./resources/v1/users/account/password.spec.js')
require('./resources/v1/users/account/recovery.spec.js')
require('./resources/v1/users/account/phone.spec.js')
require('./resources/v1/users/account/email.spec.js')

/* User Profile */
require('./resources/v1/users/profile/profile.spec.js')
require('./resources/v1/users/profile/index.spec.js')

/* Verifications */
require('./resources/v1/verifications/password.spec.js')
require('./resources/v1/verifications/user.spec.js')
