import {
  getProducts,
  getTotalRecords,
  getProductTypes,
  getMinMaxAmount,
  updatePrice,
  deleteProduct,
  insertRows
} from '../services/product.services';
const parse = require('csv-parse').parse

export const getProductsList = async (req, res, next) => {
  req.routeName = 'get.products';

  try {
    const {
      query: {
        limit,
        offset,
        type,
        text,
        min,
        max
      }
    } = req;
    const records  = await getTotalRecords(type, min, max, text);
    
    const data  = await getProducts(offset, limit, type, min, max, text); 
    if(data) {
      res.send({ status:0, data: { data, totalRecords: records[0].totalRecords } });
      return next();
    }
  } catch (err) {
    next(err);
  }
};

export const getProductFilter = async (req, res, next) => {
  req.routeName = 'get.product.filter';
  try {
    const types  = await getProductTypes();
    const minMax = await getMinMaxAmount();
    res.send({ status:0, data: {types,  min: Math.ceil(minMax[0].min), max: Math.ceil(minMax[0].max)} });
    return next();
  } catch (err) {
    next(err);
  }
};

export const updatePriceDetails = async (req, res, next) => {
  req.routeName = 'update.price.details';
  try {
    const { id,  price } = req.body;
  
    await updatePrice(id, price);
    
    res.send({ status:0, message: 'Price updated successfully' });
    return next();
  } catch (err) {
    next(err);
  }
};

export const deleteProductDetails = async (req, res, next) => {
  req.routeName = 'update.price.details';
  try {
    const { id } = req.params
    await deleteProduct(id);
    res.send({ status:0, message: 'Product deleted successfully' });
    return next();
  } catch (err) {
    next(err);
  }
};

export async function uploadFile(req, res, next) {
  try {
    const csvData = req.files.file.data.toString('utf8');
    await parse(csvData, {columns: true }, async (err, records) => {
      if (err) {
        return res.status(400).json({status:1, success: false, message: 'An error occurred'})
      }
      const result = await insertRows(records);
      res.send({ status:0, message: `${result.insertedCount} rows inserted successfully` });
      return next();
    });
  } catch (err) {
    next(err);
  }
}
