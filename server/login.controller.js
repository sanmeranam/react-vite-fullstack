import express from 'express';
import User from './schema/user.js';


const router = express.Router();

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = (await User.findOne({ email: username })).toObject();
        if (!user) {
            res.status(401).json({ message: "Invalid Credentials", ok: false });
        } else {
            req.session.user = user;
            req.session.save();
            res.json({ message: "Logged in", ok: true, user});
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", ok: false});
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: "logged out" });
});

router.get('/user', (req, res) => {
    if(req.session.user) {
        res.json({ message: "User logged in", ok: true, user: req.session.user});
    } else {
        res.json({ message: "No user logged in", ok: false });
    }
});

export default router;