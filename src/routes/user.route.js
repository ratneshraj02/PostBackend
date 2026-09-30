import { Router } from 'express';
import { loginUser, logoutUser, registerUser } from '../controller/user.controller.js';
const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

router.get('/health', (req, res) => {
	res.json({ message: 'Health Ok' });
});

export default router;
