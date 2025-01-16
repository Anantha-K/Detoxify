const mongoose = require('mongoose');

const crimeSchema = new mongoose.Schema({
    description: { type: String, required: true },
    location: { type: String, required: true },
    coordinates: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true },
    },
    images: { type: [String], default: [] },
    createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('CrimeReport', crimeSchema);
