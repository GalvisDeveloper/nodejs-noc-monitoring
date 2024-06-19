import { envs } from "./config/plugins/envs.plugin";
import { MongoDataSource } from "./data/mongo";

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

