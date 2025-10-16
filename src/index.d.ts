interface LumiLoggerConfig {
    logDir?: string;
    logFile?: string;
    colors?: boolean;
}
declare class LumiLogger {
    private logDir;
    private logFile;
    private colors;
    private readonly colorReset;
    private readonly colorRed;
    private readonly colorGreen;
    private readonly colorYellow;
    private readonly colorCyan;
    private readonly colorMagenta;
    private readonly errorLabel;
    private readonly warnLabel;
    private readonly infoLabel;
    constructor(config?: LumiLoggerConfig);
    private initLogDir;
    private colorize;
    private writeToFile;
    error(message: string, ...args: any[]): void;
    errorFatal(message: string, ...args: any[]): void;
    success(message: string, ...args: any[]): void;
    log(message: string, ...args: any[]): void;
    warn(message: string, ...args: any[]): void;
    info(message: string, ...args: any[]): void;
    debug(message: string, ...args: any[]): void;
    private formatMessage;
    clearLogs(): void;
    getLogPath(): string;
}
declare const logger: LumiLogger;
export { LumiLogger, logger };
export default logger;
//# sourceMappingURL=index.d.ts.map