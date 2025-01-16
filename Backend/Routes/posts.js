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


module.exports = router;