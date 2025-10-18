# LumiLogger 🌟

**Version:** 1.0.0  
A modern, luminous logging library for Node.js with colorful output and file persistence.

[![npm downloads](https://img.shields.io/npm/dm/lumilogger.svg)](https://www.npmjs.com/package/lumilogger)  
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 🚀 Features

- 🎨 **Colorful Console Output** - Beautiful, color-coded logs for better readability
- 📁 **File Persistence** - Automatically saves logs to files with timestamps
- 🎯 **Multiple Log Levels** - `info`, `debug`, `warn`, `error`, `success`, `errorFatal`
- ⚙️ **Fully Configurable** - Customize log directory, file names, and colors
- 🪶 **Lightweight** - Minimal dependencies, maximum performance
- 💪 **TypeScript Support** - Full type definitions included
- 🔧 **Easy Integration** - Works seamlessly with Express, NestJS, and other Node.js frameworks

---

## 📦 Installation

```bash
  npm install lumilogger
```

Or using yarn:

```bash
  yarn add lumilogger
```

---

## 🎯 Quick Start

### Basic Usage

```javascript
import logger from 'lumilogger';

// Log different message types
logger.info('Application started successfully');
logger.debug('Debugging details');
logger.warn('This is a warning');
logger.error('An error occurred');
logger.success('Operation completed successfully');
logger.errorFatal('Fatal error, exiting application');
```

### Custom Logger Instance

```javascript
import { LumiLogger } from 'lumilogger';

const customLogger = new LumiLogger({
  logDir: './logs',       // Directory to save logs
  logFile: 'app.log',     // Log file name
  colors: true            // Enable colored console output
});

customLogger.info('Using custom logger configuration');
```

---

## 📚 API Reference

### Log Levels

| Method | Description | Console Color | Use Case |
|--------|-------------|---------------|----------|
| `info(message, ...args)` | Informational messages | Blue | General application info |
| `debug(message, ...args)` | Debug information | Cyan | Development debugging |
| `warn(message, ...args)` | Warning messages | Yellow | Potential issues |
| `error(message, ...args)` | Error messages | Red | Recoverable errors |
| `success(message, ...args)` | Success messages | Green | Successful operations |
| `errorFatal(message, ...args)` | Fatal errors | Bright Red | Critical failures |

### Configuration Options

```typescript
interface LumiLoggerOptions {
  logDir?: string;   // Default: './logs'
  logFile?: string;  // Default: 'app.log'
  colors?: boolean;  // Default: true
}
```

### Utility Methods

#### `clearLogs()`
Clears all log files in the log directory.

```javascript
logger.clearLogs();
```

#### `getLogPath()`
Returns the full path of the current log file.

```javascript
const logPath = logger.getLogPath();
console.log('Logs saved at:', logPath);
```

---

## 🛠️ Framework Integration

### NestJS Example

```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import logger from 'lumilogger';

async function bootstrap() {
  try {
    logger.info('Starting NestJS application...');

    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(3000);
    logger.success('Application is running on port 3000');
  } catch (err) {
    logger.errorFatal('Failed to start application', err);
  }
}

bootstrap();
```

### Express Example

```javascript
import express from 'express';
import logger from 'lumilogger';

const app = express();
const PORT = 3000;

// Log all requests
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  logger.debug('Home route accessed');
  res.send('Hello World!');
});

app.listen(PORT, () => {
  logger.success(`Server running on port ${PORT}`);
});

// Error handling
process.on('uncaughtException', (err) => {
  logger.errorFatal('Uncaught Exception:', err);
  process.exit(1);
});
```

---

## 📝 Log File Format

Logs are automatically saved with timestamps in the following format:

```
[2025-10-18T10:30:45.123Z] INFO: Application started successfully
[2025-10-18T10:30:46.456Z] DEBUG: Debugging details
[2025-10-18T10:30:47.789Z] WARN: This is a warning
[2025-10-18T10:30:48.012Z] ERROR: An error occurred
[2025-10-18T10:30:49.345Z] SUCCESS: Operation completed successfully
[2025-10-18T10:30:50.678Z] FATAL: Fatal error, exiting application
```

---

## 🎨 Console Output

LumiLogger produces beautiful, color-coded console output:

- 🔵 **INFO** - Blue text for informational messages
- 🔷 **DEBUG** - Cyan text for debugging
- 🟡 **WARN** - Yellow text for warnings
- 🔴 **ERROR** - Red text for errors
- 🟢 **SUCCESS** - Green text for successful operations
- 🔺 **FATAL** - Bright red text for critical failures

Colors can be disabled by setting `colors: false` in the configuration.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Support

If you find LumiLogger helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs or suggesting features via [Issues](https://github.com/ThimiraSadeesha/lumilogger/issues)
- 📢 Sharing it with others

---

## 📞 Contact

- **Author:** Thimira Sadeesha
- **Email:** tsadeesha.dev@gmail.com
- **GitHub:** [@thimira](https://github.com/ThimiraSadeesha)
- **npm:** [lumilogger](https://www.npmjs.com/package/lumilogger)

---

**Made by a developer, for developers.**