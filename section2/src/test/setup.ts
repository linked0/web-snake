import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from '../app'
import request from 'supertest';

declare global {
    var signin: () => Promise<string[]>
}

let mongo: any;

beforeAll(async () => {
    jest.setTimeout(60000)
    process.env.JWT_KEY = "kdkfksfkjjsdff";
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    mongo = await MongoMemoryServer.create();
    let mongoUri = await mongo.getUri();

    await mongoose.connect(mongoUri);
})

beforeEach(async () =>{
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections) {
        await collection.deleteMany({});
    }
})

afterAll(async () => {
    await mongo.stop();
    await mongoose.connection.close()
})

global.signin = async () => {
    const res = await request(app).post('/signup').send({
        email: "email@email.com",
        password: "123456"
    }).expect(201)

    const cookie = res.get('Set-Cookie')

    if (!cookie) {
        throw new Error('Cookie not found');  // You can handle it with an error or return []
    }

    return cookie
}
