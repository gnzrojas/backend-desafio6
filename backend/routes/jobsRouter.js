import { Router } from 'express'; 
import { getAllUsers, postLogin, postNewUser  } from '../controllers/jobsController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const jobsRouter = Router();

jobsRouter.get('/usuarios', verifyToken, getAllUsers);
jobsRouter.post('/usuarios', postNewUser);
jobsRouter.post('/login', postLogin);

export default jobsRouter;