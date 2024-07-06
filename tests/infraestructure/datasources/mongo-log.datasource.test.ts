import { MongoDataSource } from '../../../src/data/mongo/init';
import { envs } from '../../../src/config/plugins/envs.plugin';
import mongoose from 'mongoose';
import { MongoLogDataSource } from '../../../src/infraestructure/datasources/mongo-log.datasource';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { LogModel } from '../../../src/data/mongo/models/log.model';


describe('MongoLogDatasource test', () => {

    const logDataSource = new MongoLogDataSource();

    const log = new LogEntity({
        message: 'test',
        origin: 'mongo-log.datasource.test.ts',
        level: LogSeverityLevel.LOW,
        createdAt: new Date(),
    });

    beforeAll(async () => {
        await MongoDataSource.connect({
            dbName: envs.MONGO_DB_NAME,
            mongoUrl: envs.MONGO_URL,
        });
    });

    afterEach(async () => {
        await LogModel.deleteMany();
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    test('Should create a log', async () => {

        const logSpy = jest.spyOn(console, 'log');

        await logDataSource.saveLogs(log);

        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith('LogMongoCreated:', expect.any(Object));

    });

    test('Should get logs', async () => {

        await logDataSource.saveLogs(log);

        const logs = await logDataSource.getLogs(LogSeverityLevel.LOW);

        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);
        expect(logs[0].message).toBe('test');

    });
});
