import { MongoDataSource } from "../../../../src/data/mongo/init";
import { envs } from '../../../../src/config/plugins/envs.plugin';
import mongoose from "mongoose";
import { LogModel } from '../../../../src/data/mongo/models/log.model';
import { LogSeverityLevel } from '../../../../src/domain/entities/log.entity';



describe('Log Model', () => {

    beforeAll(async () => {
        await MongoDataSource.connect({
            mongoUrl: envs.MONGO_URL!,
            dbName: envs.MONGO_DB_NAME!
        })
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('should return a LogModel', async () => {
        const logData = {
            origin: 'log.model.test.ts',
            level: 'LOW',
            message: 'testing log model',
        }
        const log = await LogModel.create(logData);

        expect(log).toMatchObject(logData);

        await LogModel.findByIdAndDelete(log._id);
    });

    test('should return the schema object', async () => {
        const schema = LogModel.schema.obj;

        expect(schema).toMatchObject({
            message: { type: expect.any(Function), required: true },
            level: {
                type: expect.any(Function),
                required: true,
                enum: LogSeverityLevel,
                default: 'LOW'
            },
            createdAt: expect.any(Object),
            origin: { type: expect.any(Function), required: true }
        });
    });

});