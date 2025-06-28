import { Router } from 'express'; 
import { postNewUser  } from '../controllers/jobsController.js';

const jobsRouter = Router();

jobsRouter.post('/usuarios', postNewUser);

export default jobsRouter;