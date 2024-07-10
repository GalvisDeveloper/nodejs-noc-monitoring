import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';
import { LogRepository } from '../../../src/domain/repository/log.repository';
import { LogRepositoryImpl } from '../../../src/infraestructure/repositories/log.repository.impl';



describe('LogRepositoryImpl Test', () => {

    const newLog = new LogEntity({
        message: 'Test message',
        level: LogSeverityLevel.LOW,
        origin: 'log.repository.impl.test.ts',
    })

    const mockLogDataSource = {
        getLogs: jest.fn(),
        saveLogs: jest.fn(),
    }

    const logRepositoryImpl = new LogRepositoryImpl(mockLogDataSource);

    beforeAll(() => {
        jest.clearAllMocks();
    });

    test('SaveLog Should call the datasource with arguments', async () => {
        await logRepositoryImpl.saveLogs(newLog);
        expect(mockLogDataSource.saveLogs).toHaveBeenCalledWith(newLog);
    });

    test('GetLogs Should call the datasource with arguments', async () => {
        const spy = jest.spyOn(logRepositoryImpl, 'getLogs');

        await logRepositoryImpl.getLogs(LogSeverityLevel.LOW);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(LogSeverityLevel.LOW);
    });

});