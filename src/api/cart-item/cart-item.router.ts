import express from 'express';
import { add, list, remove, updateQuantity } from './cart-item.controller';
import { validate } from '../../utils/validation-middleware';
import { CreateCartItemDTO, UpdateQuantityDTO } from './cart-item.dto';
import { isAuthenticated } from '../../utils/auth/authenticated-middleware';

const router = express.Router();

router.use(isAuthenticated);
router.get('/', list);
router.post('/', validate(CreateCartItemDTO),  add);
router.patch('/:id', validate(UpdateQuantityDTO), updateQuantity);
router.delete('/:id', remove);

export default router;