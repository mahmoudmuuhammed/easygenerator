export default () => ({
  port: parseInt(process.env.PORT!, 10) || 3000,
  CORS: {
    origins: process.env.CORS_ORIGINS
      ? process.env.CORS_ORIGINS.split(',')
      : [],
  },
  mongodb: {
    uri: process.env.MONGODB_URI!,
    db_name: process.env.MONGODB_DB_NAME!,
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiration: process.env.JWT_EXPIRATION!,
  },
});
