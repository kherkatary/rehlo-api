import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import cron from 'node-cron';
import axios from 'axios';

import connectDb from './src/config/db.js';
import userRouter from './src/routes/userRoute.js';
import postRouter from './src/routes/postRoute.js';
import propertyRouter from './src/routes/propertyRoute.js';
import BookingRouter from './src/routes/bookingRoutes.js';

// Initialize dotenv to use environment variables
dotenv.config();

// Create an Express application
const app = express();


// Define the port and server URL
const port = process.env.PORT || 3000;
const serverUrl = process.env.SERVER_URL || 'http://localhost:8080';

// Middleware configuration
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('tiny'));

// Cron job to ping the server every 15 minutes
cron.schedule('*/5 * * * *', async () => {
    try {
        const response = await axios.get(serverUrl);
        console.log(`Server ping successful: Status ${response.status}`);
    } catch (err) {
        console.error('Failed to ping server:', err.message);
    }
});

// Connect to the database
connectDb();

// Define routes
app.use('/api/v1/auth/', userRouter);
app.use('/api/v1/post/', postRouter);
app.use('/api/v1/property/', propertyRouter);
app.use('/api/v1/bookings/', BookingRouter);

app.get('/', (req, res) => {
    res.send('Rehlo API');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
