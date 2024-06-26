import { LogDataSource } from '../../../src/domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';


describe('Log DataSource', () => {

    const newLog = new LogEntity({
        message: 'Test message',
        level: LogSeverityLevel.LOW,
        origin: 'log.datasource.test.ts',
    })

    class MockLogDataSource implements LogDataSource {
        async saveLogs(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }
    }

    test('should work the abstract class', async () => {
        const mockLogDataSource = new MockLogDataSource();

        expect(mockLogDataSource).toBeInstanceOf(MockLogDataSource);
        expect(mockLogDataSource).toHaveProperty('saveLogs');
        expect(mockLogDataSource).toHaveProperty('getLogs');

        await mockLogDataSource.saveLogs(newLog);

        const logs = await mockLogDataSource.getLogs(LogSeverityLevel.LOW);
        expect(logs).toEqual([newLog]);
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);
    });

});