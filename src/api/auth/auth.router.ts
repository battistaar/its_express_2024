import express from 'express';
import { validate } from '../../utils/validation-middleware';
import { AddUserDTO, LoginDTO } from './auth.dto';
import { add, login } from './auth.controller';

const router = express.Router();

router.post('/login', validate(LoginDTO), login);
router.post('/register', validate(AddUserDTO), add);

export default router;