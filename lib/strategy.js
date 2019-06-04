var util = require('util'),
	querystring = require('querystring'),
	OAuth2Strategy = require('passport-oauth').OAuth2Strategy;

/**
 * `Strategy` constructor.
 *
 * This authentication strategy authenticates and authorizes requests by using
 * the new "Sign in with Apple" service. It uses the OAuth 2.0 protocol.
 *
 * Applications must supply a `verify` callback which accepts an `accessToken`,
 * `refreshToken` and service-specific `profile`, and then calls the `done`
 * callback supplying a `user`, which should be set to `false` if the
 * credentials are not valid.  If an exception occured, `err` should be set.
 *
 * Options:
 *   - `clientID`      your Apple client id
 *   - `clientSecret`  your Apple client secret
 *   - `callbackURL`   URL to which Apple will redirect the user
 *                     after granting authorization
 *   - `scope`         [Optional] An array of named scopes
 *
 *
 * @param {Object} options The options for the strategy.
 * @param {string} options.clientID Your Apple client id.
 * @param {string} options.clientSecret Your Apple client secret.
 * @param {string} options.callbackURL URL to which Apple will redirect the user after granting authorization.
 * @param {Array.<string>} options.scope An array of named scopes
 * @param {Function} verify The function to verify the user against a database in.
 *
 * @class  AppleSignInStrategy
 * @example
 * passport.use(new AppleSignInStrategy({
 *     clientID: 'app key',
 *     clientSecret: 'app secret'
 *         callbackURL: 'https://www.example.com/auth/apple-sign-in/callback'
 *     },
 *     function(accessToken, refreshToken, profile, done) {
 *         User.findOrCreate(..., function (err, user) {
 *             done(err, user);
 *         });
 *     }
 * ));
 */
function AppleSignInStrategy(options, verify) {
	options = options || {};
	options.authorizationURL =
		options.authorizationURL || 'https://appleid.apple.com/auth/authorize';
	options.tokenURL =
		options.tokenURL || 'https://appleid.apple.com/auth/token';
	options.scopeSeparator = options.scopeSeparator || ' ';

	OAuth2Strategy.call(this, options, verify);
	this.name = 'apple-sign-in';
	this._userProfileURL = options.userProfileURL; // We don't know about this yet, at least according to documentation

	this._oauth2.getOAuthAccessToken = function(code, params, callback) {
		params = params || {};
		var codeParam =
			params.grant_type === 'refresh_token' ? 'refresh_token' : 'code';
		params[codeParam] = code;
		params['client_id'] = this._clientId;
		params['client_secret'] = this._clientSecret;

		var body = querystring.stringify(params);
		var headers = { 'Content-Type': 'application/x-www-form-urlencoded' };

		this._request(
			'POST',
			this._getAccessTokenUrl(),
			headers,
			body,
			null,
			function(error, data, response) {
				if (error) {
					callback(error);
				} else {
					var data = JSON.parse(data);

					callback(
						null,
						data.access_token,
						data.refresh_token,
						data.expires_in,
						data
					);
				}
			}
		);
	};
}

/**
 * Inherit from `OAuth2Strategy`.
 */
util.inherits(AppleSignInStrategy, OAuth2Strategy);

/**
 * Expose `Strategy`.
 */
module.exports = AppleSignInStrategy;
