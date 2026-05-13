// The userRoutes.js file defines the routes for user-related operations, 
// such as registration and login. 
// It imports the necessary functions from the userControllers.js file and sets up the routes using Express Router. 
// The routes are then exported for use in the main application file (app.js) to handle incoming requests related to user authentication and management.

import express from 'express';
import { registerUser, loginUser, getUserData} from '../controller/userControllers.js';
import {authMiddleware} from '../middleware/auth.js';

const userRouter = express.Router(); 

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/', authMiddleware, getUserData);

export default userRouter;