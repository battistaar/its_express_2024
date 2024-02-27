import express from 'express';
import { add, list, updateQuantity } from './cart-item.controller';

const router = express.Router();

router.get('/', list);
router.post('/', add);
router.patch('/:id', updateQuantity);

export default router;