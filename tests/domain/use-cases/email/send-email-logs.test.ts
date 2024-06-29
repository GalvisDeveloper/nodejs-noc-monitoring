import nodemailer from 'nodemailer';
import { SendEmailLogs } from '../../../../src/domain/use-cases/email/send-email-logs';
import { EmailService } from '../../../../src/presentation/email/email.service';
import { LogRepository } from '../../../../src/domain/repository/log.repository';
import { LogEntity } from '../../../../src/domain/entities/log.entity';


describe('SendEmailLogs test', () => {

    const mockEmailService = {
        sendEmailWithAttachment: jest.fn().mockReturnValue(true),
        transporter: {}
    } as unknown as EmailService;

    const mockLogRepository = {
        saveLogs: jest.fn(),
        getLogs: jest.fn()
    } as LogRepository;


    const mockSendEmailLog = new SendEmailLogs(mockEmailService, mockLogRepository);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Should call sendEmail and saveLogs when email is sent', async () => {

        const result = await mockSendEmailLog.execute('neibusdev@gmail.com');

        expect(result).toBe(true);
        expect(mockEmailService.sendEmailWithAttachment).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLogs).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLogs).toHaveBeenCalledWith({
            "createdAt": expect.any(Date),
            "level": "LOW",
            "message": "Email sent to neibusdev@gmail.com",
            "origin": "sent-email-logs",
        });

    });

    test('Should create log in error case', async () => {

        mockEmailService.sendEmailWithAttachment = jest.fn().mockRejectedValue(false);

        const result = await mockSendEmailLog.execute('neibusdev@gmail.com');

        expect(result).toBe(false);
        expect(mockEmailService.sendEmailWithAttachment).toHaveBeenCalledTimes(1);
        expect(mockLogRepository.saveLogs).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockLogRepository.saveLogs).toHaveBeenCalledWith({
            "createdAt": expect.any(Date),
            "level": "HIGH",
            "message": "false",
            "origin": "sent-email-logs",
        });


    });
 
});