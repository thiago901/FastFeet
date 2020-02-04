import { Router } from 'express';
import userController from './app/controllers/userController';
import sessionController from './app/controllers/SessionController';
import recipientController from './app/controllers/RecipientController';

import authMiddleware from './app/middleware/auth';

const router = new Router();

router.post('/users', userController.store);
router.post('/sessions', sessionController.store);

router.use(authMiddleware);
router.put('/users', userController.update);
router.post('/recipient', recipientController.store);
router.put('/recipient/:id', recipientController.update);

export default router;
