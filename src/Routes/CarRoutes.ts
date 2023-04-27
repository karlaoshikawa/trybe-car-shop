import { Router } from 'express';
import CarController from '../Controllers/CarController';

const router = Router();

router.post('/', (req, res, next) => new CarController(req, res, next).addNewCar());
router.get('/', (req, res, next) => new CarController(req, res, next).findAllCars());
router.get('/:id', (req, res, next) => new CarController(req, res, next).findByIdCar());
router.put('/:id', (req, res, next) => new CarController(req, res, next).updateCarById());
router.delete('/:id', (req, res, next) => new CarController(req, res, next).deleteCarById());

export default router;