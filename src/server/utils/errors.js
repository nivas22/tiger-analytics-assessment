/* eslint-disable max-classes-per-file */
import HttpStatus from 'http-status-codes';

export class BadRequestError extends Error {
  constructor(message, errorObject) {
    super(message);
    this.statusCode = HttpStatus.BAD_REQUEST;
    this.message = message;

    this.errorObject = errorObject || {
      status: 1,
      message,
    };
  }
}

export class NotFoundError extends Error {
  constructor(message, errorObject) {
    super(message);
    this.statusCode = HttpStatus.NOT_FOUND;
    this.message = message;
    this.errorObject = errorObject;
  }
}

export class ForbiddenError extends Error {
  constructor(message, errorObject) {
    super(message);
    this.statusCode = HttpStatus.FORBIDDEN;
    this.message = message;
    this.errorObject = errorObject;
  }
}

export class NotAcceptableError extends Error {
  constructor(message, errorObject) {
    super(message);
    this.statusCode = HttpStatus.NOT_ACCEPTABLE;
    this.message = message;
    this.errorObject = errorObject;
  }
}

export class ServerError extends Error {
  constructor(message, errorObject) {
    super(message);
    this.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    this.message = message;
    this.errorObject = errorObject;
  }
}

export class UnauthorizedError extends Error {
  constructor(message, errorObject) {
    super(message);
    this.statusCode = HttpStatus.UNAUTHORIZED;
    this.message = message;

    this.errorObject = errorObject || {
      status: 1,
      message,
    };
  }
}

export class ConflictError extends Error {
  constructor(message, errorObject) {
    super(message);
    this.statusCode = HttpStatus.CONFLICT;
    this.message = message;
    this.errorObject = errorObject;
  }
}
