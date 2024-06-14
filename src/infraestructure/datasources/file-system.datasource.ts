import fs from "fs";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


/**
 * Represents a data source that interacts with the file system to store and retrieve logs.
 */
export class FileSystemDataSource extends LogDataSource {

    private readonly logPath = 'logs/';
    private readonly lowLogPath = 'logs/logs-low.log';
    private readonly mediumLogPath = 'logs/logs-medium.log';
    private readonly highLogPath = 'logs/logs-high.log';

    constructor() {
        super();
        this.createLogsFiles();
    }

    /**
     * Creates the log files if they don't exist.
     */
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

    /**
     * Reads logs from a file and returns them as an array of LogEntity objects.
     * @param path - The path of the log file to read from.
     * @returns An array of LogEntity objects representing the logs.
     */
    private getLogsFromFile = (path: string): LogEntity[] => {
        const logs = fs.readFileSync(path, 'utf8').split('\n');
        return logs.map(LogEntity.fromJson);
    }

    /**
     * Saves a new log to the appropriate log file based on its severity level.
     * @param newLog - The new log to be saved.
     * @throws Error if the method is not implemented.
     */
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

    /**
     * Retrieves logs of a specific severity level from the appropriate log file.
     * @param severityLevel - The severity level of the logs to retrieve.
     * @returns An array of LogEntity objects representing the logs.
     * @throws Error if the severity level is invalid.
     */
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