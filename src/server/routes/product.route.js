import express from 'express';
import { getProductsList, getProductFilter, updatePriceDetails, deleteProductDetails, uploadFile } from '../controller/product.controller';

const router = express.Router();
router.get('/',  getProductsList);
router.get('/filterTypes', getProductFilter);
router.post('/update', updatePriceDetails);
router.delete('/delete/:id', deleteProductDetails);
router.post('/upload_file', uploadFile);

module.exports = router;
