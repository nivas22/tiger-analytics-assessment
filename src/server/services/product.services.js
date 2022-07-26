import {
  getProducts as _getProducts,
  getTotalRecords as _getTotalRecords,
  getProductTypes as _getProductTypes,
  getMinMaxAmount as _getMinMaxAmount,
  updatePrice as _updatePrice,
  deleteProduct as _deleteProduct,
  insertRows as _insertRows
} from '../repository/product.repository';

export const getProducts = (offset, limit, type, min , max, text) => _getProducts(offset, limit, type, min, max, text);

export const getTotalRecords = (type, min, max, text) => _getTotalRecords(type, min, max, text);

export const getMinMaxAmount = (type) => _getMinMaxAmount(type);

export const getProductTypes = async () => {
  const data = await _getProductTypes();
  return data.map(d => d.type !== '' ? d.type : '').filter(Boolean);
};

export const updatePrice = async (id, price) => _updatePrice(id, price);

export const deleteProduct = async (id) => _deleteProduct(id);

export const insertRows = async (data) => {
  const result = data.map(d => {
    return [Number(d.sku), d.name, d.type, Number(d.price)]
  });
  
  let insertedCount = 0;
  let i, j, temparray, chunk = 100;
  for (i = 0, j = result.length; i < j; i += chunk) {
    temparray = result.slice(i, i + chunk);
    if(temparray.length > 0) {
      const res = await _insertRows(temparray);
      insertedCount += res && res.affectedRows;  
    }
  }
  return { insertedCount };
};
