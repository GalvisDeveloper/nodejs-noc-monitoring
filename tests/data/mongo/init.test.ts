import mongoose from 'mongoose';
import { MongoDataSource } from '../../../src/data/mongo/init';


describe('Init Mongo DB', () => {

    afterAll(async () => {
        mongoose.connection.close();
    });

    test('should connect to MongoDB', async () => {
        const connected = await MongoDataSource.connect({
            mongoUrl: process.env.MONGO_URL!,
            dbName: process.env.MONGO_DB_NAME!
        })

        expect(connected).toBe(true);
    });

    test('should throw an error', async () => {
        try {
            await MongoDataSource.connect({
                mongoUrl: 'url',
                dbName: 'test'
            })
        } catch (error) {
            expect(error).toBeInstanceOf(Error);
        }
    });

});