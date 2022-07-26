const moment = require('moment');

export function formatDateTime(timeStr) {
  return moment(timeStr, 'l hh:mm:ss A').format('YYYY-MM-DD HH:mm:ss');
}