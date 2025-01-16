const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const AppRouter = require('./Routes/Signup');
const PostsRouter = require('./Routes/posts');
const moodsRouter = require('./Routes/moods');

require('dotenv').config();


const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json())
app.use(AppRouter);
app.use(PostsRouter);
app.use(moodsRouter)

const uri = process.env.ATLAS_URI;


mongoose.connect(uri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>console.log('MongoDB Connected'))
.catch(err=>console.log(err));

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port: ${process.env.PORT}`);
});