import { Router } from 'express';
import {  editBooking,addNewBooking,getMyBookings } from '../controllers/bookingController.js';
import { requireSignInFire } from '../middlewares/auth.js';

const BookingRouter = Router();

//GET methodfs......................
BookingRouter.get('/get-my-bookings',requireSignInFire ,getMyBookings);


// POST methods.....................
BookingRouter.post('/add-new-booking' ,addNewBooking);

//PUT methods.......................
BookingRouter.put('/edit-Booking', requireSignInFire, editBooking);



export default BookingRouter;
