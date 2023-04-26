import { Router } from 'express';
import CarController from '../Controllers/car.controller';
import CarService from '../Services/car.service';
import CarODM from '../Models/CarODM';
import CarValidation from '../Services/validations/carValidations';

const routes = Router();
const carModel = new CarODM();
const carValidation = new CarValidation();
const carService = new CarService(carModel, carValidation);
const carController = new CarController(carService);

routes.post('/', carController.create);

routes.get('/', carController.getAll);

routes.get('/:id', carController.getById);

routes.put('/:id', carController.update);

export default routes;