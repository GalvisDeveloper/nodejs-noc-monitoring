import { LogModel } from "../../data/mongo/models/log.model";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDataSource implements LogDataSource {

    async saveLogs(log: LogEntity): Promise<void> {

        const newLog = await LogModel.create(log)
        // await newLog.save();
        console.log({ LogMongoCreated: newLog })

    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({ level: severityLevel });
        return logs.map(LogEntity.fromObject);
    }

}