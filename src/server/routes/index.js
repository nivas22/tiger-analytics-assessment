import express from 'express';
import productRoute from './product.route';

const router = express.Router();

router.use('/product', productRoute);

module.exports = router;
