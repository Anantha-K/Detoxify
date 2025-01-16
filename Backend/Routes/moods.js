const express = require('express');
const User = require('../Schema/User');
const router = express.Router();



// Get moods
router.get('/moods/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId, 'moodLogs');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, moodLogs: user.moodLogs });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching moods', error: error.message });
    }
});




//set mood
router.post('/moods/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { mood, notes } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        user.moodLogs.push({ mood, notes });
        await user.save();
        res.status(200).json({ success: true, message: 'Mood added successfully', moodLogs: user.moodLogs });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error setting mood', error: error.message });
    }
});

// Get user streaks
router.get('/streaks/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId, 'streaks');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, streaks: user.streaks });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching streaks', error: error.message });
    }
});

// Start or end a streak
router.post('/streaks/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const { action } = req.body; 
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (action === 'start') {
            user.streaks.startDate = new Date();
            user.streaks.currentStreak = 1;
        } else if (action === 'end') {
            user.streaks.endDate = new Date();
        }
        await user.save();
        res.status(200).json({ success: true, streaks: user.streaks });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating streaks', error: error.message });
    }
});

// Increment streak
router.post('/streaks/increment/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        user.streaks.currentStreak += 1;
        await user.save();
        res.status(200).json({ success: true, message: 'Streak incremented', streaks: user.streaks });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error incrementing streak', error: error.message });
    }
});

// family list
router.get('/family/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('families', 'name username avatar');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, families: user.families });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching family list', error: error.message });
    }
});

// friends list
router.get('/friends/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('friends', 'name username avatar');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, friends: user.friends });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching friends list', error: error.message });
    }
});

module.exports = router;
