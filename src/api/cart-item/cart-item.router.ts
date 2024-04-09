import express from 'express';
import { add, list, remove, updateQuantity } from './cart-item.controller';
import { validate } from '../../utils/validation-middleware';
import { CreateCartItemDTO } from './cart-item.dto';

const router = express.Router();

router.get('/', list);
router.post('/', validate(CreateCartItemDTO), add);
router.patch('/:id', updateQuantity);
router.delete('/:id', remove);

export default router;