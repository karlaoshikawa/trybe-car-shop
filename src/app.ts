import express from 'express';
import ErrorHandler from './Middlewares/ErrorHandler';
import carRoutes from './Routes/CarRoutes';
import motorcycleRoutes from './Routes/MotorcycleRoutes';

const app = express();
app.use(express.json());

app.use('/cars', carRoutes);
app.use('/motorcycles', motorcycleRoutes);
app.use(ErrorHandler.handle);

export default app;
