import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";


export class LogRepositoryImpl implements LogRepository {

    constructor(
        private readonly logDataSource: LogDataSource,
    ) { }

    async getLogs(severityLevel: LogSeverityLevel): Promise<any[]> {
        return this.logDataSource.getLogs(severityLevel);
    }
    async saveLogs(log: any): Promise<void> {
        this.logDataSource.saveLogs(log);
    }
}