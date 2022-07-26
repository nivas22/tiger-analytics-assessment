import mysqlErrorHandler from '../utils/mysql-errors';
import { createConnection } from '../utils/mysql-util';

export const getProducts = (offset, limit, type, min, max, text) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT * from item_tbl`;
    if(type && type !== 'All') {
      query +=` WHERE type = '${type}'`;
    }
    
    if(min > 0 && max > 0) {
      if(!query.includes('WHERE')) {
        query +=` WHERE price between ${min} and ${max}`;
      } else {
        query +=` AND price between ${min} and ${max}`;
      }
    }
    
    if(text && text !== '') {
      if(!query.includes('WHERE')) {
        query +=` WHERE name like '${text}%'`;
      } else {
        query +=` AND name like '${text}%'`;
      }
    }
    
    if(limit) {
      query +=` limit ${offset}, ${limit};`;
    }
  
    const connection = createConnection();
    connection.query(
      query,
      [],
      (err, rows) => (err ? reject(mysqlErrorHandler(err)) : resolve(rows))
    );
  });
};

export const getProductTypes = () => {
  return new Promise((resolve, reject) => {
    let query = `SELECT distinct type from item_tbl`;
    const connection = createConnection();
    connection.query(
      query,
      [],
      (err, rows) => (err ? reject(mysqlErrorHandler(err)) : resolve(rows))
    );
  });
};

export const getTotalRecords = (type, min, max, text) => {
  return new Promise((resolve, reject) => {
    let query = `SELECT count(*) as totalRecords from item_tbl`;
    if(type && type !== 'All') {
      query +=` WHERE type = '${type}'`;
    }
    
    if(min > 0 && max > 0) {
      if(!query.includes('WHERE')) {
        query +=` WHERE price between ${min} and ${max}`;
      } else {
        query +=` AND price between ${min} and ${max}`;
      }
    }
    
    if(text && text !== '') {
      if(!query.includes('WHERE')) {
        query +=` WHERE name like '${text}%'`;
      } else {
        query +=` AND name like '${text}%'`;
      }
    }
    
    const connection = createConnection();
    connection.query(
      query,
      [],
      (err, rows) => (err ? reject(mysqlErrorHandler(err)) : resolve(rows))
    );
  });
};

export const getMinMaxAmount = (type) => {
  return new Promise((resolve, reject) => {
    let query = `select min(price) as min, max(price) as max from item_tbl;`;
    
    if(type && type !== 'All') {
      query +=` WHERE type = '${type}'`;
    }
    const connection = createConnection();
    connection.query(
      query,
      [],
      (err, rows) => (err ? reject(mysqlErrorHandler(err)) : resolve(rows))
    );
  });
};

export function updatePrice(id, price) {
  
  return new Promise((resolve, reject) => {
    const pool = createConnection();
    const query = 'update item_tbl set price = ? where id = ? ';
    pool.query(query, [price, id],
      (err, rows) => (err ? reject(err) : resolve(rows)));
  });
}

export function deleteProduct(id) {
  return new Promise((resolve, reject) => {
    const pool = createConnection();
    const query = `delete from item_tbl where id = ${id}`;
    pool.query(query, [],
      (err, rows) => (err ? reject(err) : resolve(rows)));
  });
}

export async function insertRows(data) {
  return new Promise((resolve, reject) => {
    const pool = createConnection();
    const query = `INSERT INTO item_tbl(sku,name,type,price) VALUES ? `;
    pool.query(query, [data],
      (err, rows) => (err ? reject(err) : resolve(rows)));
  });
}
