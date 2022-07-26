import { BadRequestError, ServerError, UnauthorizedError } from './errors';

export default function mysqlErrorHandler(error) {
  if (!error.sqlState) {
    return error;
  }
  let mysqlErr;

  switch (error.errno) {
    case 1664: // Cannot execute statement
      mysqlErr = new ServerError(
        error.message,
        {
          status: 1,
          message: 'MysqlError-Execution-Fail',
        },
        'MySql',
        'Dependency',
      );

      break;
    case 1370: // %s command denied to user '%s'@'%s' for routine '%s'
      mysqlErr = new UnauthorizedError(
        error.message,
        {
          status: 1,
          message: 'MysqlError-Access-denied',
        },
        'MySql',
        'Dependency',
      );

      break;
    default:
      mysqlErr = new BadRequestError(
        error.message,
        {
          status: 1,
          message: 'MysqlError-Bad request',
        },
        'MySql',
        'Dependency',
      );

      break;
  }

  return mysqlErr;
}
