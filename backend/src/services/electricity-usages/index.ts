import { Router } from 'express';

export const electricityUsageRoutes = Router();

electricityUsageRoutes.get('/usages', (req, res) => {
  res.send('Electricity Usages service');
});
