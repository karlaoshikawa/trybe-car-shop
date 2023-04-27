import { Router } from 'express';
import MotorcycleController from '../Controllers/MotorcyclesController';

const router = Router();

router.post(
  '/', 
  (req, res, next) => new MotorcycleController(req, res, next).createMotorcycle(),
);
router.get(
  '/', 
  (req, res, next) => new MotorcycleController(req, res, next).findAllMotorcycles(),
);
router.get(
  '/:id', 
  (req, res, next) => new MotorcycleController(req, res, next).findByIdMotorcycle(),
);
router.put(
  '/:id', 
  (req, res, next) => new MotorcycleController(req, res, next).updateMotorcycleById(),
);
router.delete(
  '/:id',
  (req, res, next) => new MotorcycleController(req, res, next).deleteMotorcycleById(),
);

export default router;