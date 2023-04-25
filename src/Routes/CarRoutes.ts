import { Router } from 'express';
import CarController from '../Controllers/car.controller';
import CarService from '../Services/car.service';
import CarODM from '../Models/CarODM';
import CarValidation from '../Services/validations/carValidations';

const routes = Router();
const carModel = new CarODM();
const carValidation = new CarValidation();
const carSevice = new CarService(carModel, carValidation);
const carController = new CarController(carSevice);

routes.post('/', carController.create);

export default routes;