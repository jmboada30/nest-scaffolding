export const EnvConfig = () => ({
  dbHost: process.env.DB_HOST,
  dbPort: +process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbRootPassword: process.env.DB_PASSWORD_ROOT,
  dbDatabase: process.env.MYSQL_DATABASE,
  jwtSecret: process.env.JWT_SECRET,
});
