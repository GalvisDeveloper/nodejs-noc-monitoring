import fs from "fs";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class FileSystemDataSource extends LogDataSource {

    private readonly logPath = 'logs/';
    private readonly lowLogPath = 'logs/logs-low.log';
    private readonly mediumLogPath = 'logs/logs-medium.log';
    private readonly highLogPath = 'logs/logs-high.log';

    constructor() {
        super();
        this.createLogsFiles();
    }

    private createLogsFiles = () => {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }
        [
            this.lowLogPath,
            this.mediumLogPath,
            this.highLogPath
        ].forEach((path) => {
            if (fs.existsSync(path)) return;
            fs.writeFileSync(path, '');
        })
    }

    private getLogsFromFile = (path: string): LogEntity[] => {
        const logs = fs.readFileSync(path, 'utf8').split('\n');
        if (logs[0] === '') return [];
        return logs.map(LogEntity.fromJson);
    }

    async saveLogs(newLog: LogEntity): Promise<void> {
        const logAsJson = JSON.stringify(newLog);
        fs.appendFileSync(this.lowLogPath, `${logAsJson}\n`);
        if (newLog.level === LogSeverityLevel.LOW) return;
        if (newLog.level === LogSeverityLevel.MEDIUM) {
            fs.appendFileSync(this.mediumLogPath, `${logAsJson}\n`);
        } else {
            fs.appendFileSync(this.highLogPath, `${logAsJson}\n`);
        }
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        let SEVERITY_CASES: Record<LogSeverityLevel, LogEntity[]> = {
            [LogSeverityLevel.LOW]: this.getLogsFromFile(this.lowLogPath),
            [LogSeverityLevel.MEDIUM]: this.getLogsFromFile(this.mediumLogPath),
            [LogSeverityLevel.HIGH]: this.getLogsFromFile(this.highLogPath),
        }

        if (severityLevel in SEVERITY_CASES) {
            return await SEVERITY_CASES[severityLevel];
        } else {
            throw new Error("Invalid severity level");
        }
    }
}