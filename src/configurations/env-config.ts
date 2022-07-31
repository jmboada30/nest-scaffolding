import { registerAs } from '@nestjs/config';

const EnvConfig = () => ({
  port: process.env.PORT,
  mysql: {
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  jwtSecret: process.env.JWT_SECRET,
});

export default registerAs('config', EnvConfig);
