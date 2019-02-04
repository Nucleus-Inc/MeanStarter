/* Specs will follow the order below */

/* Hooks */
require('./hooks.js')

/* User Signup */
require('./resources/v1/users/account/local/signup.spec.js')

/* User Local Auth */
require('./resources/v1/users/auth/local/jwt.spec.js')
require('./resources/v1/users/auth/local/local.spec.js')

/* User Local Account */
require('./resources/v1/users/account/local/activation.spec.js')
require('./resources/v1/users/account/local/password.spec.js')
require('./resources/v1/users/account/local/recovery.spec.js')
require('./resources/v1/users/account/local/phone.spec.js')
require('./resources/v1/users/account/local/email.spec.js')
require('./resources/v1/users/account/local/photo.spec.js')
require('./resources/v1/users/account/local/displayName.spec.js')
require('./resources/v1/users/account/local/index.spec.js')

/* User Facebook OAuth2 */
require('./resources/v1/users/auth/facebook/oauth2/index.spec.js')
require('./resources/v1/users/auth/facebook/oauth2/connect/index.spec.js')
require('./resources/v1/users/auth/facebook/oauth2/disconnect/index.spec.js')

/* User Facebook OAuth2 Token */
require('./resources/v1/users/auth/facebook/token/index.spec.js')
require('./resources/v1/users/auth/facebook/token/connect/index.spec.js')

/* User Google OAuth2 */
require('./resources/v1/users/auth/google/oauth2/index.spec.js')
require('./resources/v1/users/auth/google/oauth2/connect/index.spec.js')
require('./resources/v1/users/auth/google/oauth2/disconnect/index.spec.js')

/* Verifications */
require('./resources/v1/verifications/password.spec.js')
require('./resources/v1/verifications/user.spec.js')
