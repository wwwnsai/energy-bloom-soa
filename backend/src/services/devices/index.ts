import { Router } from 'express';
import { addDevice, updateDevice, deleteDevice, getDevices} from './devices.actions.js';

export const deviceRoutes = Router();

deviceRoutes.get('/devices', (req, res) => {
  res.send('Devices service');
});

deviceRoutes.get('/devices/get', async (req, res) => {
  try {
    const userId = req.query.user_id as string;

    const devices = await getDevices({ user_id: userId });

    if (!devices) {
      return res.status(400).json({ error: 'devices not found' });
    }

    res.json(devices);
  
} catch (error) {
  const typedError = error as Error;
  res.status(500).json({ error: typedError.message });
}

});
