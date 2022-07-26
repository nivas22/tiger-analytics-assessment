/* eslint-disable func-names */
import mysql from 'mysql';
import config from 'config';

let pool;

function createConnection() {
  const mysqlOptions = config.mysql;
  mysqlOptions.user = process.env.MYSQL_USERNAME || mysqlOptions.user;
  mysqlOptions.password = process.env.MYSQL_PASSWORD || mysqlOptions.password;
  mysqlOptions.host = process.env.MYSQL_HOSTNAME || mysqlOptions.host;
  mysqlOptions.port = process.env.MYSQL_PORT || mysqlOptions.port;

  mysqlOptions.typeCast = function (field, next) {
    if (field.type === 'BIT') {
      const buffer = field.parser.parseLengthCodedBuffer();
      return buffer && buffer[0] === 1; // 1 = true, 0 = false
    }

    return next();
  };

  if (!pool) {
    pool = mysql.createPool(mysqlOptions);
  }

  return pool;
}

module.exports = {
  createConnection,
};
