"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = exports.LumiLogger = void 0;
var fs = require("fs");
var path = require("path");
var LumiLogger = /** @class */ (function () {
    function LumiLogger(config) {
        if (config === void 0) { config = {}; }
        this.colorReset = '\x1b[0m';
        this.colorRed = '\x1b[31m';
        this.colorGreen = '\x1b[32m';
        this.colorYellow = '\x1b[33m';
        this.colorCyan = '\x1b[36m';
        this.colorMagenta = '\x1b[35m';
        this.errorLabel = '[ERROR] ';
        this.warnLabel = '[WARN] ';
        this.infoLabel = '[INFO] ';
        this.logDir = config.logDir || path.join(process.cwd(), 'logs');
        this.logFile = config.logFile || 'app.log';
        this.colors = config.colors !== undefined ? config.colors : true;
        this.initLogDir();
    }
    LumiLogger.prototype.initLogDir = function () {
        try {
            if (!fs.existsSync(this.logDir)) {
                fs.mkdirSync(this.logDir, { recursive: true });
            }
        }
        catch (error) {
            console.error(this.colorRed, 'Failed to create log directory:', error, this.colorReset);
        }
    };
    LumiLogger.prototype.colorize = function (color, message) {
        return this.colors ? "".concat(color).concat(message).concat(this.colorReset) : message;
    };
    LumiLogger.prototype.writeToFile = function (message) {
        var logPath = path.join(this.logDir, this.logFile);
        var timestamp = new Date().toISOString();
        var logEntry = "".concat(timestamp, " ").concat(message, "\n");
        try {
            fs.appendFileSync(logPath, logEntry, 'utf8');
        }
        catch (error) {
            console.error(this.colorRed, 'Failed to write to log file:', error, this.colorReset);
        }
    };
    // Error logging methods
    LumiLogger.prototype.error = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var formattedMsg = this.formatMessage(message, args);
        console.log(this.colorize(this.colorRed, formattedMsg));
        this.writeToFile(this.errorLabel + formattedMsg);
    };
    LumiLogger.prototype.errorFatal = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var formattedMsg = this.formatMessage(message, args);
        this.writeToFile(this.errorLabel + formattedMsg);
        console.error(this.colorize(this.colorRed, formattedMsg));
        process.exit(1);
    };
    // Success/Default logging methods
    LumiLogger.prototype.success = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var formattedMsg = this.formatMessage(message, args);
        console.log(this.colorize(this.colorGreen, formattedMsg));
        this.writeToFile(formattedMsg);
    };
    LumiLogger.prototype.log = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        this.success.apply(this, __spreadArray([message], args, false));
    };
    // Warning logging methods
    LumiLogger.prototype.warn = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var formattedMsg = this.formatMessage(message, args);
        console.log(this.colorize(this.colorYellow, formattedMsg));
        this.writeToFile(this.warnLabel + formattedMsg);
    };
    // Info logging methods
    LumiLogger.prototype.info = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var formattedMsg = this.formatMessage(message, args);
        console.log(this.colorize(this.colorCyan, formattedMsg));
        this.writeToFile(this.infoLabel + formattedMsg);
    };
    // Debug logging method
    LumiLogger.prototype.debug = function (message) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var formattedMsg = this.formatMessage(message, args);
        console.log(this.colorize(this.colorMagenta, formattedMsg));
        this.writeToFile('[DEBUG] ' + formattedMsg);
    };
    LumiLogger.prototype.formatMessage = function (message, args) {
        if (args.length === 0)
            return message;
        // Simple string interpolation
        var result = message;
        args.forEach(function (arg) {
            var value = typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
            result += ' ' + value;
        });
        return result;
    };
    // Clear log file
    LumiLogger.prototype.clearLogs = function () {
        var logPath = path.join(this.logDir, this.logFile);
        try {
            if (fs.existsSync(logPath)) {
                fs.writeFileSync(logPath, '', 'utf8');
                this.info('Log file cleared');
            }
        }
        catch (error) {
            this.error('Failed to clear log file:', error);
        }
    };
    // Get log file path
    LumiLogger.prototype.getLogPath = function () {
        return path.join(this.logDir, this.logFile);
    };
    return LumiLogger;
}());
exports.LumiLogger = LumiLogger;
// Create default instance
var logger = new LumiLogger();
exports.logger = logger;
exports.default = logger;
