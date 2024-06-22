import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import { MongoDataSource } from "./data/mongo";
import { Server } from "./presentation/server";
import { LogSeverityLevel } from "./domain/entities/log.entity";
import { PostgresLogDataSource } from "./infraestructure/datasources/postgres.datasource";


const main = async () => {
    await MongoDataSource.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })

    Server.start();
}

(async () => {
    main();
})()

