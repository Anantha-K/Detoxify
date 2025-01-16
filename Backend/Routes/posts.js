const express = require('express');
const Post = require('../Schema/Post');
const router = express.Router();


router.post('/create', async (req, res) => {
    const { title, content , author,image} = req.body;

    try {
        const newPost = new Post({
            title,
            description,
            author
        });

        const savedPost = await newPost.save();

        res.status(201).json({
            message: 'Post created successfully',
            post: {
                id: savedPost._id,
                title: savedPost.title,
                content: savedPost.content,
                author:savedPost.author
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.get('/getPosts',async (req,res)=>{
    try{
        const posts = await Post.find();
        res.status(200).json({
            success: true,
            data: posts
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({
            success: false,
            message: 'Error fetching posts',
            error: error.message
        });
    }
})



router.post('/events', async (req, res) => {
    try {
        const { title, description, image, date, time, venue, organizer } = req.body;

        if (!title || !description || !date || !time || !venue || !organizer) {
            return res.status(400).json({ message: 'All required fields must be provided.' });
        }

        const newEvent = new Event({
            title,
            description,
            image,
            date,
            time,
            venue,
            organizer
        });

        const savedEvent = await newEvent.save();
        res.status(201).json({ message: 'Event created successfully', event: savedEvent });
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/events', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.status(200).json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/events/:id', async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        res.status(200).json(event);
    } catch (error) {
        console.error('Error fetching event:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;