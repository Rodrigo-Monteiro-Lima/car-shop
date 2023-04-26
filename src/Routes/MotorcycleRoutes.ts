import { Router } from 'express';
import MotorcycleODM from '../Models/MotorcycleODM';
import MotorcycleValidation from '../Services/validations/motorcycleValidation';
import MotorcycleService from '../Services/motorcycle.service';
import MotorcycleController from '../Controllers/motorcycle.controller';

const routes = Router();
const motorcycleModel = new MotorcycleODM();
const motorcycleValidation = new MotorcycleValidation();
const motorcycleService = new MotorcycleService(motorcycleModel, motorcycleValidation);
const motorcycleController = new MotorcycleController(motorcycleService);

routes.post('/', motorcycleController.create);

routes.get('/', motorcycleController.getAll);

routes.get('/:id', motorcycleController.getById);

routes.put('/:id', motorcycleController.update);

routes.delete('/:id', motorcycleController.delete);

export default routes;