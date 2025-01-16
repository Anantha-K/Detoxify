const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    avatar: { type: String, default: '' },
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    families: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    authoredPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    followingCommunities: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Community' }],
    streaks: {
        currentStreak: { type: Number, default: 0 },
        startDate: { type: Date },
        endDate: { type: Date },
    },
    addictions: [String],
    moodLogs: [{
        date: { type: Date, default: Date.now },
        mood: { type: String, required: true },
    }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
