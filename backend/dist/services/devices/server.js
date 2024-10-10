import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { deviceRoutes } from './index.js';
const app = express();
const PORT = process.env.DEVICES_PORT || 3002; // Default to port 5001
app.use(express.json());
app.use('/devices', deviceRoutes);
app.listen(PORT, () => {
    console.log(`Devices service running on port ${PORT}`);
});
