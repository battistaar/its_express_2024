import express from 'express';
import cartItemRouter from './cart-item/cart-item.router';
import productRouter from './product/product.router';
import authRouter from './auth/auth.router';

const router = express.Router();

router.use('/cart-items', cartItemRouter);
router.use('/products', productRouter);
router.use(authRouter);

export default router;