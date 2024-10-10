var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Router } from 'express';
import { getDevices } from './devices.actions.js';
export const deviceRoutes = Router();
deviceRoutes.get('/devices', (req, res) => {
    res.send('Devices service');
});
deviceRoutes.get('/devices/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.user_id;
        const devices = yield getDevices({ user_id: userId });
        if (!devices) {
            return res.status(400).json({ error: 'devices not found' });
        }
        res.json(devices);
    }
    catch (error) {
        const typedError = error;
        res.status(500).json({ error: typedError.message });
    }
}));
