import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";



export class Server {

    constructor() { }

    static start() {
        CronService.createJob('*/5 * * * * *', () => {
            new CheckService(
                () => console.log('success'),
                (error) => console.log(error))
                .execute('http://google.com')
        });
    }
}