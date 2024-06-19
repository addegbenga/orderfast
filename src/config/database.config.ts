export default () => ({
  psql: {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.POSTGRES_DB,
    // autoLoadEntities: true,
    synchronize: process.env.NODE_ENV === 'development',
    logging: process.env.NODE_ENV === 'development',
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    // migrations: [`${__dirname}/../../db/migrations/*{.ts,.js}`],
    // migrationsTableName: 'migrations',
  },
  mongodb: process.env.MONGO_URI,
  redis: {
    url: `${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    type: 'single',
    options: {
      password: process.env.REDIS_PASSWORD,
      username: process.env.REDIS_USERNAME,
    },
  },
});
