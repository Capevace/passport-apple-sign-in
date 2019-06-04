<h1 align="center">"Sign in with Apple" Passport Strategy</h1>
<h6 align="center">Use Apple's brand new sign-in service with Passport.</h6>

[![NPM Version][npm-image]][npm-url]
[![Downloads Stats][npm-downloads]][npm-url]

**Warning: "Sign in with Apple" is not actually on the market yet, and this library was developed according to
the [documentation specifications][apple-docs]. Use with caution.**

### [Documentation][docs]

## Installation

```sh
npm install passport-apple-sign-in --save
```

## Usage example

Use it like you would any other Passport strategy:

```js
var AppleSignInStrategy = require('passport-apple-sign-in');

passport.use(
  new AppleSignInStrategy(
    {
    	clientID: appKey,
    	clientSecret: appSecret,
    	callbackURL: 'https://example.com/auth/apple-sign-in/callback'
    },
    function(accessToken, refreshToken, expires_in, profileData, done) {
    	const user = await Database.findUser(/* ... */);

    	return done(null, user);
    }
  )
);
```

_For detailed documentation, please refer to the [Docs][docs]._

## Release History

-   0.0.2
    -   Fixed minor docs issues
-   0.0.1
    -   Implementation according to specs

## Authors

Lukas Mateffy – [@Capevace](https://twitter.com/capevace) – [mateffy.me](https://mateffy.me)

Distributed under the MIT license. See `LICENSE` for more information.

## Contributing

1. Fork it (<https://github.com/capevace/passport-apple-sign-in/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request

## Acknowledgments

[Passport Spotify](https://github.com/JMPerez/passport-spotify) for the basic Strategy template.

<!-- Markdown link & img dfn's -->

[npm-image]: https://img.shields.io/npm/v/passport-apple-sign-in.svg?style=flat-square
[npm-url]: https://npmjs.org/package/passport-apple-sign-in
[npm-downloads]: https://img.shields.io/npm/dm/passport-apple-sign-in.svg?style=flat-square
[docs]: https://capevace.github.io/passport-apple-sign-in
[apple-docs]: https://developer.apple.com/documentation/signinwithapplerestapi
