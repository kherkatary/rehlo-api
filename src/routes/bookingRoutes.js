import { Router } from 'express';
import {  protectedRoute,fetchProfile,editBooking,addNewBooking } from '../controllers/bookingController.js';
import { requireSignInFire } from '../middlewares/auth.js';

const BookingRouter = Router();


BookingRouter.post('/add-new-Booking', requireSignInFire,addNewBooking);
BookingRouter.post('/protected', requireSignInFire, protectedRoute);
BookingRouter.post('/Booking-details', requireSignInFire, fetchProfile);
BookingRouter.put('/edit-Booking', requireSignInFire, editBooking);


export default BookRouter;
