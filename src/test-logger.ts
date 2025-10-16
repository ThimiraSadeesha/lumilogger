
import logger, {LumiLogger} from "./index";

logger.info('This is an info message');
logger.warn('This is a warning');
logger.error('This is an error');
logger.success('This is a success message');
logger.debug('Debugging details:', { key: 'value' });

// Using custom instance
const customLogger = new LumiLogger({ logFile: 'custom.log', colors: false });
customLogger.info('Custom logger info');
customLogger.clearLogs();
