import * as fs from 'fs';
import * as path from 'path';

interface LumiLoggerConfig {
    logDir?: string;
    logFile?: string;
    colors?: boolean;
}

class LumiLogger {
    private logDir: string;
    private logFile: string;
    private colors: boolean;

    private readonly colorReset = '\x1b[0m';
    private readonly colorRed = '\x1b[31m';
    private readonly colorGreen = '\x1b[32m';
    private readonly colorYellow = '\x1b[33m';
    private readonly colorCyan = '\x1b[36m';
    private readonly colorMagenta = '\x1b[35m';

    private readonly errorLabel = '[ERROR] ';
    private readonly warnLabel = '[WARN] ';
    private readonly infoLabel = '[INFO] ';

    constructor(config: LumiLoggerConfig = {}) {
        this.logDir = config.logDir || path.join(process.cwd(), 'logs');
        this.logFile = config.logFile || 'app.log';
        this.colors = config.colors !== undefined ? config.colors : true;

        this.initLogDir();
    }

    private initLogDir(): void {
        try {
            if (!fs.existsSync(this.logDir)) {
                fs.mkdirSync(this.logDir, { recursive: true });
            }
        } catch (error) {
            console.error(this.colorRed, 'Failed to create log directory:', error, this.colorReset);
        }
    }

    private colorize(color: string, message: string): string {
        return this.colors ? `${color}${message}${this.colorReset}` : message;
    }

    private writeToFile(message: string): void {
        const logPath = path.join(this.logDir, this.logFile);
        const timestamp = new Date().toISOString();
        const logEntry = `${timestamp} ${message}\n`;

        try {
            fs.appendFileSync(logPath, logEntry, 'utf8');
        } catch (error) {
            console.error(this.colorRed, 'Failed to write to log file:', error, this.colorReset);
        }
    }

    // Error logging methods
    error(message: string, ...args: any[]): void {
        const formattedMsg = this.formatMessage(message, args);
        console.log(this.colorize(this.colorRed, formattedMsg));
        this.writeToFile(this.errorLabel + formattedMsg);
    }

    errorFatal(message: string, ...args: any[]): void {
        const formattedMsg = this.formatMessage(message, args);
        this.writeToFile(this.errorLabel + formattedMsg);
        console.error(this.colorize(this.colorRed, formattedMsg));
        process.exit(1);
    }

    // Success/Default logging methods
    success(message: string, ...args: any[]): void {
        const formattedMsg = this.formatMessage(message, args);
        console.log(this.colorize(this.colorGreen, formattedMsg));
        this.writeToFile(formattedMsg);
    }

    log(message: string, ...args: any[]): void {
        this.success(message, ...args);
    }

    // Warning logging methods
    warn(message: string, ...args: any[]): void {
        const formattedMsg = this.formatMessage(message, args);
        console.log(this.colorize(this.colorYellow, formattedMsg));
        this.writeToFile(this.warnLabel + formattedMsg);
    }

    // Info logging methods
    info(message: string, ...args: any[]): void {
        const formattedMsg = this.formatMessage(message, args);
        console.log(this.colorize(this.colorCyan, formattedMsg));
        this.writeToFile(this.infoLabel + formattedMsg);
    }

    // Debug logging method
    debug(message: string, ...args: any[]): void {
        const formattedMsg = this.formatMessage(message, args);
        console.log(this.colorize(this.colorMagenta, formattedMsg));
        this.writeToFile('[DEBUG] ' + formattedMsg);
    }

    private formatMessage(message: string, args: any[]): string {
        if (args.length === 0) return message;

        // Simple string interpolation
        let result = message;
        args.forEach((arg) => {
            const value = typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
            result += ' ' + value;
        });

        return result;
    }

    // Clear log file
    clearLogs(): void {
        const logPath = path.join(this.logDir, this.logFile);
        try {
            if (fs.existsSync(logPath)) {
                fs.writeFileSync(logPath, '', 'utf8');
                this.info('Log file cleared');
            }
        } catch (error) {
            this.error('Failed to clear log file:', error);
        }
    }

    // Get log file path
    getLogPath(): string {
        return path.join(this.logDir, this.logFile);
    }
}

// Create default instance
const logger = new LumiLogger();

// Export both the class and default instance
export { LumiLogger, logger };
export default logger;