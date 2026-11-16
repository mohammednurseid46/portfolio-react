export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  database: {
    url: process.env.DATABASE_URL,
    urlTest: process.env.DATABASE_URL_TEST,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  },
  admin: {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD,
  },
  security: {
    hashSalt: process.env.HASH_SALT,
    corsOrigins: process.env.CORS_ORIGINS || 'http://localhost:5173',
  },
  docs: {
    enabled: process.env.DOCS_ENABLED !== 'false',
  },
  smtp: {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER,
    password: process.env.SMTP_PASSWORD,
    notifyEmail: process.env.NOTIFY_EMAIL,
  },
});
