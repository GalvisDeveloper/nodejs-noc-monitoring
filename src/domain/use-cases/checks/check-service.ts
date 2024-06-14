import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly LogRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) { }

    async execute(url: string) {
        try {
            const req = await fetch(url);
            if (!req.ok) {
                throw new Error(`Error on check service ${url}`);
            }

            const log = new LogEntity(`Service ${url} is up`, LogSeverityLevel.LOW);
            this.LogRepository.saveLogs(log)
            this.successCallback();

            return true;
        } catch (error) {

            const log = new LogEntity(`${error} on ${url}`, LogSeverityLevel.HIGH);
            this.LogRepository.saveLogs(log)
            this.errorCallback(`${error} on ${url}`);
            return false;
        }
    }
}