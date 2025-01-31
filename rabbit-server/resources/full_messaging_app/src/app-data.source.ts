import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5455,
    username: 'admin',
    password: 'admin',
    database: 'main',
    entities: ['./dist/**/*.entity.js'],
    logging: false,
    synchronize: false,
    migrations: ['./dist/src/migrations/*-migration.js'],
    migrationsRun: true
})
