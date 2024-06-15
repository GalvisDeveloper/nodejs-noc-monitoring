import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource() // it can be a database, a file system, or any other data source
);

export class Server {

    constructor() { }

    static start() {
        CronService.createJob('*/5 * * * * *', () => {
            new CheckService(fileSystemLogRepository, undefined, undefined)
                .execute('http://google.com')
        });
    }
}