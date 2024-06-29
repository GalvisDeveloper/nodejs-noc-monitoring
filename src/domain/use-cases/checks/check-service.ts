import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
    execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {

    constructor(
        private readonly LogRepository: LogRepository,
        private readonly successCallback: SuccessCallback,
        private readonly errorCallback: ErrorCallback
    ) { }

    async execute(url: string): Promise<boolean> {
        try {
            await fetch(url);

            const log = new LogEntity({ message: `Service ${url} is up`, level: LogSeverityLevel.LOW, origin: 'check-service.ts' });
            this.LogRepository.saveLogs(log)
            this.successCallback && this.successCallback();

            return true;
        } catch (error) {
            const log = new LogEntity({ message: `${error} on ${url}`, level: LogSeverityLevel.HIGH, origin: 'check-service.ts' });
            this.LogRepository.saveLogs(log)
            this.errorCallback && this.errorCallback(`${error} on ${url}`);
            return false;
        }
    }
}