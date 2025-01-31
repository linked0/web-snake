import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import Application from '../application'
import request from 'supertest';

declare global {
    var singin: () => Promise<string[]>;
}
let mongo: any;

beforeAll(async () => {
    process.env.JWT_KEY = 'afasdfasdfasdfasdf90zcvz'
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    mongo = await MongoMemoryServer.create();
    let mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri);
});

beforeEach(async () => {
    const db = mongoose.connection.db;
    if (!db) {
        throw new Error('Database connection is not established');
    }
    const collections = await db.collections();
    for (let collection of collections) {
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close();
})
