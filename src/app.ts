import { envs } from "./config/plugins/envs.plugin";
import { MongoDataSource } from "./data/mongo";
import { LogModel } from "./data/mongo/models/log.model";
import { LogSeverityLevel } from "./domain/entities/log.entity";

const main = async () => {
    await MongoDataSource.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    })

    // Server.start();
}

(async () => {
    main();
})()

