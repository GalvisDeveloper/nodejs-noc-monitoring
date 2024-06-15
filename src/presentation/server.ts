import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from './email/email.service';

// import * as fs from 'fs';
// import * as path from 'path';

const fileSystemLogRepository = new LogRepositoryImpl(
    new FileSystemDataSource() // it can be a database, a file system, or any other data source
);

export class Server {

    constructor() { }

    static start() {
        // CronService.createJob('*/5 * * * * *', () => {
        //     new CheckService(fileSystemLogRepository, undefined, undefined)
        //         .execute('http://google.com')
        // });

        const emailService = new EmailService(fileSystemLogRepository);
        // const htmlPath = path.join(__dirname, '../test.html');
        // const htmlContent = fs.readFileSync(htmlPath, 'utf8'); // Lee el contenido del archivo HTML
        // emailService.sendEmail({
        //     to: 'gersongm0011@gmail.com',
        //     subject: 'Gerson tengo ganas de cagar mano',
        //     htmlBody: '<p>AH AH AH AH AH AH AH AH AH AH AH AH AH AH AH AHA HA AH AH AH AH AH AH HA A GERSON ES CACHON</p>',
        // })

        emailService.sendEmailWithAttachment(
            ['gersongm0011@gmail.com', 'neibusdev@gmail.com', 'galvisdeveloper@gmail.com']
        )
    }
}