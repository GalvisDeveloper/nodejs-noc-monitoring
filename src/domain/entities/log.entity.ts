

export enum LogSeverityLevel {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
}

export interface LogEntityOptions {
    message: string;
    level: LogSeverityLevel;
    createdAt?: Date;
    origin: string;
}

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor(options: LogEntityOptions) {
        const { message, level, origin } = options;
        this.level = level;
        this.message = message;
        this.origin = origin;
        this.createdAt = new Date();
    }

    static fromJson = (json: string): LogEntity => {
        const { message, level, createdAt, origin } = JSON.parse(json);
        const log = new LogEntity({ message, level, origin });
        log.createdAt = new Date(createdAt);
        return log;
    }

    static fromObject = (object: { [key: string]: any }): LogEntity => {
        const { message, level, origin } = object
        const log = new LogEntity({ message, level, origin });
        return log
    }
}