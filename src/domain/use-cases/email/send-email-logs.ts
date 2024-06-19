import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";


interface SendLogEmailUseCase {
    execute: (to: string) => Promise<boolean>;
}

export class SendEmailLogs implements SendLogEmailUseCase {

    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository,
    ) { }

    async execute(to: string | string[]): Promise<boolean> {
        try {
            const sent = await this.emailService.sendEmailWithAttachment(to);
            if (!sent) {
                throw new Error('Failed to send email');
            }

            const log = new LogEntity({
                message: `Email sent to ${to}`,
                level: LogSeverityLevel.LOW,
                origin: 'sent-email-logs'
            })
            this.logRepository.saveLogs(log);
            return true;

        } catch (error) {
            const log = new LogEntity({
                message: `${error}`,
                level: LogSeverityLevel.HIGH,
                origin: 'sent-email-logs'
            })
            this.logRepository.saveLogs(log);
            return false;
        }
    }
}