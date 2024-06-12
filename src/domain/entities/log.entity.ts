

export enum LogSeverityLevel { 
    INFO = 'INFO',
    WARNING = 'WARNING',
    ERROR = 'ERROR'
}

export class LogEntity {

    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;

    constructor(level: LogSeverityLevel, message: string) {
        this.level = level;
        this.message = message;
        this.createdAt = new Date();
    }
}