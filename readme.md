sudo rm -rf /Library/Developer/CommandLineTools &&
sudo xcode-select --install

## Planned Dependencies:

- [x] `body-parser` - body parser
- [x] `bcryptjs` - password hashing
- [x] `cookie-parser` - parsing cookies from requests
- [x] `cors` - CORS
- [x] `csurf` - CSRF protection
- [x] `dotenv` - load environment variables into Node.js from a `.env` file
- [x] `express` - Express
- [x] `express-async-handler` - handling `async` route handlers
- [x] `express-validator` - validation of request bodies
- [x] `faker` - random seeding library
- [x] `helmet` - security middleware
- [x] `jsonwebtoken` - JWT
- [x] `morgan` - logging information about server requests/responses
- [x] `per-env` - use environment variables for starting app differently
- [] `jest` - jest

<!-- - `pg@">=8.4.1"` - PostgresQL greater or equal to version 8.4.1
- `sequelize@5` - Sequelize
- `sequelize-cli@5` - use `sequelize` in the command line -->

# Make a .env file

See .env.example

# Mongo set up for Mac Catalina

https://www.youtube.com/watch?v=4crXgQZG4W8

# Test in Development

`npm run test -- --watch`
