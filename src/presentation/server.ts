import { envs } from "../config/plugins/envs.plugin";
import { MongoDataSource } from "../data/mongo";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { LogRepository } from "../domain/repository/log.repository";
import { CheckService } from "../domain/use-cases/checks/check-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { FileSystemDataSource } from "../infraestructure/datasources/file-system.datasource";
import { MongoLogDataSource } from "../infraestructure/datasources/mongo-log.datasource";
import { PostgresLogDataSource } from "../infraestructure/datasources/postgres.datasource";
import { LogRepositoryImpl } from "../infraestructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { EmailService } from './email/email.service';

// import * as fs from 'fs';
// import * as path from 'path';

// const logRepository = new LogRepositoryImpl(
//     // new FileSystemDataSource() // it can be a database, a file system, or any other data source
//     // new MongoLogDataSource()
//     new PostgresLogDataSource()
// );

const fsLogRepository = new LogRepositoryImpl(new FileSystemDataSource());
const mongoLogRepository = new LogRepositoryImpl(new MongoLogDataSource());
const postgresLogRepository = new LogRepositoryImpl(new PostgresLogDataSource());

const emailService = new EmailService();

export class Server {

    constructor() { }

    static async start() {

        //! Saving logs in differents data sources
        // const logs = await logRepository.saveLogs({
        //     message: 'Hola mundo2',
        //     level: LogSeverityLevel.LOW,
        //     origin: 'servert.ts'
        // })

        // console.log({ logs })
        // const logs = await logRepository.getLogs(LogSeverityLevel.LOW);
        // console.log({ logs })


        //! Cron Job saving logs in differents data sources
        CronService.createJob('*/5 * * * * *', () => {
            new CheckServiceMultiple(
                [fsLogRepository, mongoLogRepository, postgresLogRepository],
                () => console.log('success'),
                () => console.log('failed')
            )
                .execute('http://google.com')
        });

        //! Send email without attachment
        // const emailService = new EmailService(fileSystemLogRepository);
        // const htmlPath = path.join(__dirname, '../test.html');
        // const htmlContent = fs.readFileSync(htmlPath, 'utf8'); // Lee el contenido del archivo HTML
        // emailService.sendEmail({
        //     to: 'gersongm0011@gmail.com',
        //     subject: 'Gerson tengo ganas de cagar mano',
        //     htmlBody: '<p>AH AH AH AH AH AH AH AH AH AH AH AH AH AH AH AHA HA AH AH AH AH AH AH HA A GERSON ES CACHON</p>',
        // })

        //! Send email With attachment
        // emailService.sendEmailWithAttachment(
        //     ['gersongm0011@gmail.com', 'neibusdev@gmail.com', 'galvisdeveloper@gmail.com']
        // )

        //! Send email with logs
        // new SendEmailLogs(
        //     emailService,
        //     fileSystemLogRepository
        // ).execute(['galvisdeveloper@gmail.com'])
    }
}