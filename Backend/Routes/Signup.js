const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Schema/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { name, username, email, mobileNumber, password } = req.body;

    try {
        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Email or Username already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            username,
            email,
            mobileNumber,
            password: hashedPassword
        });

        const savedUser = await newUser.save();

        const token = jwt.sign(
            { userId: savedUser._id, username: savedUser.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: savedUser._id,
                name: savedUser.name,
                username: savedUser.username,
                email: savedUser.email,
                mobileNumber: savedUser.mobileNumber
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                username: user.username,
                email: user.email,
                mobileNumber: user.mobileNumber
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
