"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
index_1.default.info('This is an info message');
index_1.default.warn('This is a warning');
index_1.default.error('This is an error');
index_1.default.success('This is a success message');
index_1.default.debug('Debugging details:', { key: 'value' });
// Using custom instance
var customLogger = new index_1.LumiLogger({ logFile: 'custom.log', colors: false });
customLogger.info('Custom logger info');
customLogger.clearLogs();
