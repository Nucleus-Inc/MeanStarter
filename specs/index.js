/* Specs will follow the order below */

/* Hooks */
require('./hooks.js')

/* User Account */
require('./resources/users/account/signup.spec.js')
require('./resources/users/auth/jwt.spec.js')
require('./resources/users/account/activation.spec.js')
require('./resources/users/auth/local.spec.js')
require('./resources/users/account/name.spec.js')
require('./resources/users/account/index.spec.js')
require('./resources/users/account/password.spec.js')
require('./resources/users/account/recovery.spec.js')
require('./resources/users/account/phone.spec.js')
require('./resources/users/account/email.spec.js')

/* User Profile */
require('./resources/users/profile/profile.spec.js')
require('./resources/users/profile/index.spec.js')

/* Verifications */
require('./resources/verifications/password.spec.js')
require('./resources/verifications/user.spec.js')
