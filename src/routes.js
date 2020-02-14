import { Router } from 'express';

import multer from 'multer';

import multerConfig from './config/multer';
import userController from './app/controllers/userController';
import sessionController from './app/controllers/SessionController';
import recipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import SignatureController from './app/controllers/SignatureController';
import FileController from './app/controllers/FileController';
import DelivermanDeliveriesConstroller from './app/controllers/DelivermanDeliveriesConstroller';
import DeliveriesCompletedConstroller from './app/controllers/DeliveriesCompletedConstroller';
import DeliveriesStartsConstroller from './app/controllers/DeliveriesStartsConstroller';
import DeliveriesEndConstroller from './app/controllers/DeliveriesEndConstroller';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';
import ProblemController from './app/controllers/ProblemController';

import authMiddleware from './app/middleware/auth';

const router = new Router();

const upload = multer(multerConfig);

router.post('/users', userController.store);
router.post('/sessions', sessionController.store);

router.use(authMiddleware);
router.post('/files', upload.single('file'), FileController.store);
router.delete('/files/:id', FileController.delete);
router.put('/files/:id', upload.single('file'), FileController.update);

router.put('/users', userController.update);

// Rotas referente ao endereco dos clientes
router.post('/recipient', recipientController.store);
router.put('/recipient/:id', recipientController.update);

// Rotas referente ao entregador
router.get('/deliveryman', DeliverymanController.index);
router.post('/deliveryman', DeliverymanController.store);
router.put('/deliveryman/:id', DeliverymanController.update);
router.delete('/deliveryman/:id', DeliverymanController.delete);

// Rotas referente às Entregas do Entregador
router.get(
  '/deliveryman/:id/deliveries',
  DelivermanDeliveriesConstroller.index
);

// Rotas referente inicialização da entrega
router.put('/deliveries/start', DeliveriesStartsConstroller.update);

// Rotas referente finalização da entrega
router.put('/deliveries/end', DeliveriesEndConstroller.update);

// Rotas referente a Entregador X Entregas Completas
router.get(
  '/deliveryman/:id/deliveries/completed',
  DeliveriesCompletedConstroller.index
);

// Rotas referente Finalização da entrega
router.post(
  '/deliveryman/deliveries/completed',
  DeliveriesCompletedConstroller.index
);

// Rotas referente as entregas
router.post('/delivery', DeliveryController.store);
router.put('/delivery/:id', DeliveryController.update);

router.post(
  '/delivery/:id/signatures',
  upload.single('signatures'),
  SignatureController.store
);

// Rotas Problemas
router.post('/delivery/:delivery_id/problems', DeliveryProblemController.store);
router.get('/delivery/:delivery_id/problems', DeliveryProblemController.index);

// Cancelamento de entrega baseado no problema
router.delete('/problem/:id_problem/cancel-delivery', ProblemController.delete);

export default router;
