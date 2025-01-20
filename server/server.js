import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/testRoute.js';

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
