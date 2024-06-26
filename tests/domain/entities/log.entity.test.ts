import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";


describe('Log Entity', () => {

    const objLog = {
        message: 'Test message',
        level: LogSeverityLevel.LOW,
        origin: 'log.entity.test.ts',
    }

    test('should create a new log entity instance', async () => {
        const newLog = new LogEntity(objLog);

        expect(newLog).toBeInstanceOf(LogEntity);
        expect(newLog).toHaveProperty('message');
        expect(newLog.message).toBe(objLog.message);
        expect(newLog).toHaveProperty('level');
        expect(newLog).toHaveProperty('origin');
        expect(newLog).toHaveProperty('createdAt');
    });

    test('should create a new log entity instance from JSON', async () => {
        // const newLog = LogEntity.fromJson(JSON.stringify(objLog));
        const json = `{"level":"LOW","message":"Service http://google.com is up","origin":"check-service.ts","createdAt":"2024-06-22T15:14:05.353Z"}`
        const newLog = LogEntity.fromJson(json);

        expect(newLog.message).toBe(JSON.parse(json).message);
        expect(newLog.level).toBe(JSON.parse(json).level);
        expect(newLog.createdAt).toStrictEqual(new Date(JSON.parse(json).createdAt));
        expect(newLog.origin).toBe(JSON.parse(json).origin);

        expect(newLog).toBeInstanceOf(LogEntity);
        expect(newLog).toHaveProperty('message');
        expect(newLog).toHaveProperty('level');
        expect(newLog).toHaveProperty('origin');
        expect(newLog).toHaveProperty('createdAt');
    });

    test('should create a new log entity instance from object', async () => {
        const newLog = LogEntity.fromObject(objLog);

        expect(newLog).toBeInstanceOf(LogEntity);
        expect(newLog).toHaveProperty('message');
        expect(newLog).toHaveProperty('level');
        expect(newLog).toHaveProperty('origin');
        expect(newLog).toHaveProperty('createdAt');
    });

});