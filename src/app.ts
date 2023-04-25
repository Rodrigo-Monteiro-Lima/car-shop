import express from 'express';
import ErrorHandler from './middlewares/ErrorHandler';
import CarRoutes from './Routes/CarRoutes';
import 'express-async-errors';

const app = express();
app.use(express.json());
app.use('/cars', CarRoutes);
app.use(ErrorHandler.handle);

export default app;
