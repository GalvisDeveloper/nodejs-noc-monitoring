import * as fs from 'fs';
import path from 'path';
import { FileSystemDataSource } from '../../../src/infraestructure/datasources/file-system.datasource';
import { LogEntity, LogSeverityLevel } from '../../../src/domain/entities/log.entity';


describe('FileSystemDataSource Test', () => {

    const logPath = path.join(__dirname, '../../../logs');


    beforeEach(() => {
        fs.rmSync(logPath, { recursive: true, force: true });
        // fs.rmSync('logs', { recursive: true, force: true });
    })

    test('Should create log files if they don`t exist', () => {
        new FileSystemDataSource();
        const files = fs.readdirSync(logPath);

        expect(files).toHaveLength(3);
        expect(files).toContain('logs-low.log');
        expect(files).toEqual(['logs-high.log', 'logs-low.log', 'logs-medium.log']);
    });

    test('Should save a log in logs-low.log', () => {
        const fileSystemDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            level: LogSeverityLevel.LOW,
            message: 'Test log',
            createdAt: new Date(),
            origin: 'file-system.datasource.test.ts'
        });

        fileSystemDataSource.saveLogs(log);

        const logs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8');
        expect(logs).toContain(JSON.stringify(log));
    });

    test('Should save a log in logs-low.log y logs-medium.log', () => {
        const fileSystemDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            level: LogSeverityLevel.MEDIUM,
            message: 'Test log',
            createdAt: new Date(),
            origin: 'file-system.datasource.test.ts'
        });

        console.log({ log })

        fileSystemDataSource.saveLogs(log);

        const logs = fs.readFileSync(`${logPath}/logs-low.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
        expect(logs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));
    });

    test('Should return all logs', async () => {
        const fileSystemDataSource = new FileSystemDataSource();
        const log = new LogEntity({
            level: LogSeverityLevel.LOW,
            message: 'Test log low',
            createdAt: new Date(),
            origin: 'file-system.datasource.test.ts'
        });

        const logMedium = new LogEntity({
            level: LogSeverityLevel.MEDIUM,
            message: 'Test log medium',
            createdAt: new Date(),
            origin: 'file-system.datasource.test.ts'
        });

        const logHigh = new LogEntity({
            level: LogSeverityLevel.HIGH,
            message: 'Test log high',
            createdAt: new Date(),
            origin: 'file-system.datasource.test.ts'
        });

        await fileSystemDataSource.saveLogs(log);
        await fileSystemDataSource.saveLogs(logMedium);
        await fileSystemDataSource.saveLogs(logHigh);

        const logsLow = await fileSystemDataSource.getLogs(LogSeverityLevel.LOW);
        const logsMedium = await fileSystemDataSource.getLogs(LogSeverityLevel.MEDIUM);
        const logsHigh = await fileSystemDataSource.getLogs(LogSeverityLevel.HIGH);

        expect(logsLow).toEqual(expect.arrayContaining([log, logMedium, logHigh]));
        expect(logsMedium).toEqual(expect.arrayContaining([logMedium]));
        expect(logsHigh).toEqual(expect.arrayContaining([logHigh]));
    })

    
})