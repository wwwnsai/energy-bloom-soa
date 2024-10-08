import { Router } from 'express';
import { getLoggedInUser, getUserInfo, logoutAccount, signIn, signUp } from './users.actions';
// import { cookies } from 'next/headers';
import { createClient } from "../../utils/supabase/server";

export const userRoutes = Router();

userRoutes.get('/', (req, res) => {
  res.send('Users service');
});

userRoutes.get("/logged-in-user", async (req, res) => {
  console.log("Request received for /logged-in-user");
  try {
    const user = await getLoggedInUser();
    if (!user) return res.status(400).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ error: typedError.message });
  }
});

userRoutes.get('/get', async (req, res) => {
  try {
    const userId = req.query.user_id as string;
    const user = await getUserInfo({ user_id: userId });
    if (!user) return res.status(400).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ error: typedError.message });
  }
});

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


userRoutes.post('/sign-in', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await signIn({ email, password });
    if (!user) return res.status(400).json({ error: 'User not found' });
    
    // Example: Setting a cookie after successful sign-in
    res.cookie('auth_token', user.id, { httpOnly: true, secure: true });
    
    res.json(user);
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ error: typedError.message });
  }
});



userRoutes.post('/sign-up', async (req, res) => {
  if (req.method === 'POST') {
    // const cookieStore = cookies();
    try {
      const password = req.body.password as string;
      const newUser = await signUp({password, ...req.body});

      console.log('newUser', newUser);

      if (!newUser) return res.status(400).json({ error: 'User not created' });
      else res.status(200).json(newUser);

    } catch (error) {
      const typedError = error as Error;
      res.status(500).json({ error: typedError.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});

userRoutes.get('/logout-account', async (req, res) => {
  try {
    const data = await logoutAccount();
    res.json(data.message === "Successfully logged out.");
  } catch (error) {
    const typedError = error as Error;
    res.status(500).json({ error: typedError.message });
  }
});

// users/index.ts
userRoutes.get('/test-supabase', async (req, res) => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.from('users').select('*').limit(1);
    if (error) {
      console.error('Supabase test query error:', error);
      return res.status(500).json({ error: error.message });
    }
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error in test-supabase:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



