import { SendMailOptions, Attachment, EmailService } from '../../../src/presentation/email/email.service';
import nodemailer from 'nodemailer';


describe('EmailService Test', () => {

    const mockSendMail = jest.fn();

    const email = 'neibusdev@google.com'

    // Mock createTransport method from nodemailer
    nodemailer.createTransport = jest.fn().mockReturnValue({
        sendMail: mockSendMail
    });

    const emailService = new EmailService();

    test('Should send email', async () => {

        const options: SendMailOptions = {
            to: email,
            subject: 'Test email from test cases',
            htmlBody: '<h1>This is a test email from test cases</h1>',
        };

        const response = await emailService.sendEmail(options);

        expect(response).toBe(true);

        expect(mockSendMail).toHaveBeenCalledWith({
            to: options.to,
            subject: options.subject,
            html: options.htmlBody,
            attachments: expect.any(Array)
        })
    })

    test('Should send email with attachment', async () => {

        await emailService.sendEmailWithAttachment(email);

        expect(mockSendMail).toHaveBeenCalledWith({
            to: email,
            subject: 'Logs de la aplicación',
            html: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
            attachments: expect.arrayContaining([
                { filename: 'logs-low.log', path: './logs/logs-low.log' },
                { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
                { filename: 'logs-high.log', path: './logs/logs-high.log' },
            ])
        })
    })

});