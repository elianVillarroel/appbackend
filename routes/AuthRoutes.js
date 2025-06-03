import express from 'express';
import { login, verifyToken } from '../controllers/AuthController.js';

const router = express.Router();

router.post('/login', login);
router.get('/verify', verifyToken, (req, res) => {
    res.json({ success: true, usuario: req.usuario });
});

export default router;