import express from 'express';
import { isAuthenticated } from '../../utils/auth/authenticated-middleware';
import { me } from './user.controller';

const router = express.Router();

router.get('/me', isAuthenticated, me);

export default router;