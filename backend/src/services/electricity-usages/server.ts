import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { electricityUsageRoutes } from './index';

const app = express();
const PORT = process.env.ELECTRICITY_USAGE_PORT || 3003; // Default to port 5001

app.use(express.json());
app.use('/usages', electricityUsageRoutes);

app.listen(PORT, () => {
  console.log(`Usages service running on port ${PORT}`);
});
