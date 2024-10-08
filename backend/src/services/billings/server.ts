// src/services/billings/server.ts
import dotenv from 'dotenv';
import express from 'express';
import { billingRoutes } from './index';

dotenv.config();

const app = express();
const PORT = process.env.BILLING_PORT || 3001;

app.use(express.json());

// Use billing routes
app.use('/billings', billingRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
  console.log(`Billing service running on port ${PORT}`);
});
