import * as dotenv from 'dotenv';
dotenv.config();

import { Options } from '@mikro-orm/core';

const config: Options = {
  migrations: {
    path: './src/migrations',
    tableName: 'migrations',
    transactional: true,
  },
  allowGlobalContext: true,
  tsNode: process.env.NODE_DEV === 'true' ? true : false,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  dbName: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  debug: !process.env.PRODUCTION,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  type: 'postgresql',
};

export default config;
