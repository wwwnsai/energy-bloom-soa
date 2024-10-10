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
import { getLoggedInUser, getUserInfo, logoutAccount, signIn, signUp } from './users.actions.js';
// import { cookies } from 'next/headers';
import { createClient } from "../../utils/supabase/server.js";
export const userRoutes = Router();
userRoutes.get('/', (req, res) => {
    res.send('Users service');
});
userRoutes.get("/logged-in-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Request received for /logged-in-user");
    try {
        const user = yield getLoggedInUser();
        if (!user)
            return res.status(400).json({ error: "User not found" });
        res.json(user);
    }
    catch (error) {
        const typedError = error;
        res.status(500).json({ error: typedError.message });
    }
}));
userRoutes.get('/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.query.user_id;
        const user = yield getUserInfo({ user_id: userId });
        if (!user)
            return res.status(400).json({ error: 'User not found' });
        res.json(user);
    }
    catch (error) {
        const typedError = error;
        res.status(500).json({ error: typedError.message });
    }
}));
// userRoutes.post('/sign-in', async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await signIn({ email, password });
//     if (!user) return res.status(400).json({ error: 'User not found' });
//     res.json(user);
//   } catch (error) {
//     const typedError = error as Error;
//     res.status(500).json({ error: typedError.message });
//   }
// });
userRoutes.post('/sign-in', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield signIn({ email, password });
        if (!user)
            return res.status(400).json({ error: 'User not found' });
        // Example: Setting a cookie after successful sign-in
        res.cookie('auth_token', user.id, { httpOnly: true, secure: true });
        res.json(user);
    }
    catch (error) {
        const typedError = error;
        res.status(500).json({ error: typedError.message });
    }
}));
userRoutes.post('/sign-up', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.method === 'POST') {
        // const cookieStore = cookies();
        try {
            const password = req.body.password;
            const newUser = yield signUp(Object.assign({ password }, req.body));
            console.log('newUser', newUser);
            if (!newUser)
                return res.status(400).json({ error: 'User not created' });
            else
                res.status(200).json(newUser);
        }
        catch (error) {
            const typedError = error;
            res.status(500).json({ error: typedError.message });
        }
    }
    else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}));
userRoutes.get('/logout-account', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield logoutAccount();
        res.json(data.message === "Successfully logged out.");
    }
    catch (error) {
        const typedError = error;
        res.status(500).json({ error: typedError.message });
    }
}));
// users/index.ts
userRoutes.get('/test-supabase', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const supabase = createClient();
        const { data, error } = yield supabase.from('users').select('*').limit(1);
        if (error) {
            console.error('Supabase test query error:', error);
            return res.status(500).json({ error: error.message });
        }
        res.json({ success: true, data });
    }
    catch (error) {
        console.error('Error in test-supabase:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
