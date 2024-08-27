# TypeScript FullStack MERN Template

## Dependencies:

- [x] `body-parser` - body parser
- [x] `bcryptjs` - password hashing
- [x] `cookie-parser` - parsing cookies from requests
- [x] `cors` - CORS
- [x] `csurf` - CSRF protection
- [x] `dotenv` - load environment variables into Node.js from a `.env` file
- [x] `express` - Express
- [x] `express-async-handler` - handling `async` route handlers
- [x] `express-validator` - validation of request bodies
- [x] `helmet` - security middleware
- [x] `jsonwebtoken` - JWT
- [x] `morgan` - logging information about server requests/responses
- [x] `per-env` - use environment variables for starting app differently
- [x] `jest` - jest

# Make a .env file

See .env.example

# Mongo set up for Mac Catalina

https://www.youtube.com/watch?v=4crXgQZG4W8

# Test in Development

`npm run test -- --watch`
<!-- 
# Test POST routes in Postman

1. Make a GET request to the server
2. copy the XSRF token set in the cookie 
3. put token in the header `XSRF-TOKEN` for you next POST request
4. any requests in between will invalidate the token, so you must repeat this pattern for every request -->
