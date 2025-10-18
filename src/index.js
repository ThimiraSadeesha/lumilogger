"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.LumiLogger = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class LumiLogger {
    logDir;
    logFile;
    colors;
    colorReset = '\x1b[0m';
    colorRed = '\x1b[31m';
    colorGreen = '\x1b[32m';
    colorYellow = '\x1b[33m';
    colorCyan = '\x1b[36m';
    colorMagenta = '\x1b[35m';
    errorLabel = '[ERROR] ';
    warnLabel = '[WARN] ';
    infoLabel = '[INFO] ';
    constructor(config = {}) {
        this.logDir = config.logDir || path.join(process.cwd(), 'logs');
        this.logFile = config.logFile || 'app.log';
        this.colors = config.colors !== undefined ? config.colors : true;
        this.initLogDir();
    }
    initLogDir() {
        try {
            if (!fs.existsSync(this.logDir)) {
                fs.mkdirSync(this.logDir, { recursive: true });
            }
        }
        catch (error) {
            console.error(this.colorRed, 'Failed to create log directory:', error, this.colorReset);
        }
    }
    colorize(color, message) {
        return this.colors ? `${color}${message}${this.colorReset}` : message;
    }
    writeToFile(message) {
        const logPath = path.join(this.logDir, this.logFile);
        const timestamp = new Date().toISOString();
        const logEntry = `${timestamp} ${message}\n`;
        try {
            fs.appendFileSync(logPath, logEntry, 'utf8');
        }
        catch (error) {
            console.error(this.colorRed, 'Failed to write to log file:', error, this.colorReset);
        }
    }
    // Error logging methods
    error(message, ...args) {
        const formattedMsg = this.formatMessage(message, args);
        console.log(this.colorize(this.colorRed, formattedMsg));
        this.writeToFile(this.errorLabel + formattedMsg);
    }
    errorFatal(message, ...args) {
        const formattedMsg = this.formatMessage(message, args);
        this.writeToFile(this.errorLabel + formattedMsg);
        console.error(this.colorize(this.colorRed, formattedMsg));
        process.exit(1);
    }
    // Success/Default logging methods
    success(message, ...args) {
        const formattedMsg = this.formatMessage(message, args);
        console.log(this.colorize(this.colorGreen, formattedMsg));
        this.writeToFile(formattedMsg);
    }
    log(message, ...args) {
        this.success(message, ...args);
    }
    // Warning logging methods
    warn(message, ...args) {
        const formattedMsg = this.formatMessage(message, args);
        console.log(this.colorize(this.colorYellow, formattedMsg));
        this.writeToFile(this.warnLabel + formattedMsg);
    }
    // Info logging methods
    info(message, ...args) {
        const formattedMsg = this.formatMessage(message, args);
        console.log(this.colorize(this.colorCyan, formattedMsg));
        this.writeToFile(this.infoLabel + formattedMsg);
    }
    // Debug logging method
    debug(message, ...args) {
        const formattedMsg = this.formatMessage(message, args);
        console.log(this.colorize(this.colorMagenta, formattedMsg));
        this.writeToFile('[DEBUG] ' + formattedMsg);
    }
    formatMessage(message, args) {
        if (args.length === 0)
            return message;
        // Simple string interpolation
        let result = message;
        args.forEach((arg) => {
            const value = typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
            result += ' ' + value;
        });
        return result;
    }
    // Clear log file
    clearLogs() {
        const logPath = path.join(this.logDir, this.logFile);
        try {
            if (fs.existsSync(logPath)) {
                fs.writeFileSync(logPath, '', 'utf8');
                this.info('Log file cleared');
            }
        }
        catch (error) {
            this.error('Failed to clear log file:', error);
        }
    }
    // Get log file path
    getLogPath() {
        return path.join(this.logDir, this.logFile);
    }
}
exports.LumiLogger = LumiLogger;
// Create default instance
const logger = new LumiLogger();
exports.logger = logger;
exports.default = logger;
//# sourceMappingURL=index.js.map