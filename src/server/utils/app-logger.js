import path from 'path';

const { createLogger, format, transports } = require('winston');

const dateFormat = () => {
  return new Date(Date.now()).toUTCString();
};

class AppLogger {
  constructor(route) {
    const file = path.join(__dirname, '../../../logs/app.log');
    const options = {
      file: {
        level: 'debug',
        filename: file,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
      },
      console: {
        level: 'info',
        handleExceptions: true,
        json: false,
        colorize: true,
      },
    };

    const logger = createLogger({
      transports: [
        new transports.File(options.file),
        new transports.Console(options.console),
      ],
      format: format.printf(info => {
        let message = '';
        if (info && info.obj) {
          message = `${dateFormat()} | ${info.level.toUpperCase()} | ${route} | ${
            info.message
          } | ${JSON.stringify(info.obj)} |`;
        } else {
          message = `${dateFormat()} | ${info.level.toUpperCase()} | ${route} | ${
            info.message
          } | `;
        }
        return message;
      }),
    });

    this.logger = logger;
  }

  async info(message, obj) {
    this.showLog('info', message, obj);
  }

  async debug(message, obj) {
    this.showLog('debug', message, obj);
  }

  async error(message, obj) {
    this.showLog('error', message, obj);
  }

  showLog(level, message, obj) {
    if (obj) {
      this.logger.log(level, message, {
        obj,
      });
      return;
    }
    this.logger.log(level, message);
  }
}
module.exports = AppLogger;
