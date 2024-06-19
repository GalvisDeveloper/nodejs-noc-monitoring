
import nodemailer from 'nodemailer'
import { envs } from '../../config/plugins/envs.plugin';
import { LogRepository } from '../../domain/repository/log.repository';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';

interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {

    private transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL_ID,
            pass: envs.MAILER_SECRET_KEY,
        }
    });

    constructor() { }

    async sendEmail(options: SendMailOptions): Promise<boolean> {

        const { to, subject, htmlBody, attachments = [] } = options;

        try {
            const sentInformation = await this.transporter.sendMail(
                {
                    to: to,
                    subject: subject,
                    html: htmlBody,
                    attachments: attachments
                }
            )
            console.log({ sentInformation })
            return true;
        } catch (error) {
            return false;
        }
    }

    async sendEmailWithAttachment(to: string | string[]) {
        const subject = 'Logs de la aplicación';
        const htmlBody = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';

        const attachments: Attachment[] = [
            { filename: 'logs-low.log', path: './logs/logs-low.log' },
            { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
            { filename: 'logs-high.log', path: './logs/logs-high.log' },
        ]

        return this.sendEmail({ to, subject, htmlBody, attachments })
    }

}