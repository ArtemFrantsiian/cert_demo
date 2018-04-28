import express from 'express';
import { verifySecret } from "../functions";

const router = express.Router();

router.post('/', (req, res) => {
    const { userId, token } = req.body;
    //TODO get secret from storage using USERID
    const secret = userId;
    res.status(200).json({ success: verifySecret(secret, token) });
    // res.status(200).json({ success: true });
});

export default router;