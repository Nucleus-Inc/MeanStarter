/* Specs will follow the order below */

/* Hooks */
require('./hooks.js')

/* User Signup */
require('./resources/v1/users/account/local/signup.spec.js')

/* User Local Auth */
require('./resources/v1/users/auth/local/jwt.spec.js')
require('./resources/v1/users/auth/local/local.spec.js')

/* User Facebook OAuth2 */
require('./resources/v1/users/auth/facebook/index.spec.js')
require('./resources/v1/users/auth/facebook/connect/index.spec.js')
require('./resources/v1/users/auth/facebook/disconnect/index.spec.js')

/* User Local Account */
require('./resources/v1/users/account/local/activation.spec.js')
require('./resources/v1/users/account/local/password.spec.js')
require('./resources/v1/users/account/local/recovery.spec.js')
require('./resources/v1/users/account/local/phone.spec.js')
require('./resources/v1/users/account/local/email.spec.js')
require('./resources/v1/users/account/local/photo.spec.js')
require('./resources/v1/users/account/local/displayName.spec.js')

/* User Account */
require('./resources/v1/users/account/local/index.spec.js')

/* Verifications */
require('./resources/v1/verifications/password.spec.js')
require('./resources/v1/verifications/user.spec.js')
