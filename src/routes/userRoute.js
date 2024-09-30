import { Router } from 'express';
import {  protectedRoute,fetchProfile,editUser,addNewUser } from '../controllers/userController.js';
import { requireSignInFire } from '../middlewares/auth.js';

const userRouter = Router();

// userRouter.post('/login', Login);
userRouter.post('/add-new-user', requireSignInFire,addNewUser);
userRouter.post('/protected', requireSignInFire, protectedRoute);
userRouter.post('/user-details', requireSignInFire, fetchProfile);
userRouter.put('/edit-user', requireSignInFire, editUser);
// userRouter.get('/verify/:id/:slug', verifyEmail);

export default userRouter;
