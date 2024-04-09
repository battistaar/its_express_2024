import express from 'express';
import { list, detail } from './product.controller';
import { validate } from '../../utils/validation-middleware';
import { ProductQueryDTO } from './product.dto';

const router = express.Router();

router.get('/', validate(ProductQueryDTO, 'query'), list);
router.get('/:id', detail);

export default router;