/* eslint-disable func-names */
import HttpStatus from 'http-status-codes';

export default function errorHandler(log) {
  return function (error, req, res, next) {
    const reqObject = {
      host: req.headers.host,
      url: req.originalUrl,
      routeName: req.routeName,
      httpMethod: req.method,
      userAgent: req.headers['user-agent'],
      response: error,
    };

    log.error(error, reqObject);

    if (!res.headersSent) {
      res.status(error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR);
      res.send(error.errorObject || { status: 1, message: error.message });
    }
    next();
  };
}
