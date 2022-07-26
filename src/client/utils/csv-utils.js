/**
 * CSV separator
 */

const separator = ',';

/**
  * Prevent Excel's casting.
  */
 
const preventCast = false;
 
/**
  * Ignore `null` or `undefined`
  */
 
const ignoreNullOrUndefined = true;
 
function escape(field) {
  if (ignoreNullOrUndefined && field === undefined) {
    return '';
  }
  if (preventCast) {
    return `="${String(field).replace(/"/g, '""')}"`;
  }
  return `"${String(field).replace(/"/g, '""')}"`;
}
 
function objToArray(obj) {
  const result = [];
 
  Object.keys(obj).forEach((prop) => {
    result.push(obj[prop]);
  });
 
  return result;
}
 
export function constructBody(obj) {
  let body = '';
  obj.forEach((item) => {
    if (!(item instanceof Array)) {
      const item1 = objToArray(item);
      body += `${item1.map(escape).join(separator)}\r\n`;
    } else {
      body += `${item.map(escape).join(separator)}\r\n`;
    }
  });
 
  return body;
}
 
export function constructCsvBody(obj, tableTitle) {
  let body = '';
  obj.forEach((item) => {
    const response = tableTitle.map((title) => item[title]);
    body += `${response.map(escape).join(separator)}\r\n`;
  });
  return body;
}

export function constructTitle(obj) {
  const result = Object.keys(obj);
  result.push('\n');
  return result;
}
 