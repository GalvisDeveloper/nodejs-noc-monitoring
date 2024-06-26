import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entity";
import { LogRepository } from '../../../src/domain/repository/log.repository';


describe('Log Repository', () => {

    const newLog = new LogEntity({
        message: 'Test message',
        level: LogSeverityLevel.LOW,
        origin: 'log.repository.test.ts',
    })

    class MockLogRepository implements LogRepository {
        async saveLogs(log: LogEntity): Promise<void> {
            return;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
            return [newLog];
        }
    }

    test('should work the abstract class', async () => {
        const mockLogRepository = new MockLogRepository();

        expect(mockLogRepository).toBeInstanceOf(MockLogRepository);
        expect(mockLogRepository).toHaveProperty('saveLogs');
        expect(mockLogRepository).toHaveProperty('getLogs');

        await mockLogRepository.saveLogs(newLog);

        const logs = await mockLogRepository.getLogs(LogSeverityLevel.LOW);
        expect(logs).toEqual([newLog]);
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);
    });

});