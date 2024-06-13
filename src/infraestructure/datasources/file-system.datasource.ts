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

    async saveLogs(log: LogEntity): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }

}