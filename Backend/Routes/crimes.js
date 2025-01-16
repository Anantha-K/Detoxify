const express = require('express');
const router = express.Router();
const CrimeReport = require('../models/CrimeReport');



router.post('/', async (req, res) => {
    try {
        const { description, location, coordinates, images } = req.body;

        if (!description || !location || !coordinates) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const newReport = new CrimeReport({
            description,
            location,
            coordinates,
            images,
        });

        await newReport.save();
        res.status(201).json({ message: 'Report submitted successfully', report: newReport });
    } catch (error) {
        console.error('Error submitting report:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.get('/', async (req, res) => {
    try {
        const reports = await CrimeReport.find().sort({ createdAt: -1 });
        res.status(200).json(reports);
    } catch (error) {
        console.error('Error fetching reports:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
