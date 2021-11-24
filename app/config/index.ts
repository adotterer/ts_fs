module.exports = {
  environment: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 8080,
  db: {
//     DB_DATABASE=gg_db
//     DB_HOST=mongodb://127.0.0.1:27017/whatver
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST
  },
  // jwtConfig: {
  //   secret: process.env.JWT_SECRET,
  //   expiresIn: process.env.JWT_EXPIRES_IN
  // }
};
