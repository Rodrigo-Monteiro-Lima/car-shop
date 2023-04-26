import express from 'express';
import ErrorHandler from './middlewares/ErrorHandler';
import CarRoutes from './Routes/CarRoutes';
import MotorcycleRoutes from './Routes/MotorcycleRoutes';

const app = express();
app.use(express.json());
app.use('/cars', CarRoutes);
app.use('/motorcycles', MotorcycleRoutes);
app.use(ErrorHandler.handle);

export default app;
