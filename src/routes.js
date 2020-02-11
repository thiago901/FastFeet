import { Router } from 'express';

import multer from 'multer';

import multerConfig from './config/multer';
import userController from './app/controllers/userController';
import sessionController from './app/controllers/SessionController';
import recipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middleware/auth';

const router = new Router();

const upload = multer(multerConfig);

router.post('/users', userController.store);
router.post('/sessions', sessionController.store);

router.use(authMiddleware);
router.post('/files', upload.single('file'), FileController.store);

router.put('/users', userController.update);
router.post('/recipient', recipientController.store);
router.put('/recipient/:id', recipientController.update);

router.get('/deliveryman', DeliverymanController.index);
router.post('/deliveryman', DeliverymanController.store);
router.put('/deliveryman/:id', DeliverymanController.update);
router.delete('/deliveryman/:id', DeliverymanController.delete);

export default router;
