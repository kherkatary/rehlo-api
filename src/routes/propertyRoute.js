import { Router } from 'express';
import { getAllProperties, getSpecificRoom, addProperty } from '../controllers/propertyController.js';

const propertyRouter = Router();

propertyRouter.get('/all-property', getAllProperties);
propertyRouter.get('/get-specific/:id', getSpecificRoom);


export default propertyRouter;
