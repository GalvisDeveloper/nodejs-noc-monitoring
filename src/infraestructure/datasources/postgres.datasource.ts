import { PrismaClient } from "@prisma/client";
import { LogModel } from "../../data/mongo/models/log.model";
import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();

export class PostgresLogDataSource implements LogDataSource {

    async saveLogs(log: LogEntity): Promise<void> {
        const newLog = await prisma.logModel.create({ data: log });
        // await newLog.save();
        console.log({ LogPostgresCreated: newLog })
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await prisma.logModel.findMany({ where: { level: severityLevel } });
        return logs.map(LogEntity.fromObject);
    }

}