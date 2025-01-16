const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    description: { type: String, required: true }, 
    image: { type: String, default: '' },
    date: { type: Date, required: true },
    time: { type: String, required: true }, 
    venue: { 
        name: { type: String, required: true }, 
        address: { type: String, required: true }, 
    },
    organizer: { type: String, required: true }, 

}, { timestamps: true }); 

module.exports = mongoose.model('Event', eventSchema);
