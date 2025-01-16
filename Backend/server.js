const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const AppRouter = require('./Routes/Signup');
const PostsRouter = require('./Routes/posts');
const moodsRouter = require('./Routes/moods');
const geminiService = require('./services/geminiService');
const pineconeService = require('./services/pineconeService');
const Chat = require('./Schema/chat');
const ContextBuilder = require('./utils/context');
const embeddingService = require('./utils/embeddings');


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






const checkForCrisis = (message) => {
    const crisisKeywords = [
        'suicide', 'kill myself', 'want to die', 'end it all',
        'overdose', 'emergency', 'hopeless', 'can\'t go on'
    ];
    return crisisKeywords.some(keyword => message.toLowerCase().includes(keyword));
};



const getCrisisResponse = () => {
    return {
        response: `I'm very concerned about what you're saying and want to make sure you're safe. 
        Please reach out for immediate help:
        
        1. National Crisis Hotline: 988 (24/7)
        2. Emergency Services: 911
        3. National Suicide Prevention Lifeline: 1-800-273-8255
        4. Contact your doctor or sponsor immediately
        
        Your life has value and people care about you. Would you like me to help you contact your healthcare provider or a family member?`,
        needsHumanIntervention: true
    };
};

app.post('/api/chat', async (req, res) => {
    try {
        const { userId, message } = req.body;

        if (checkForCrisis(message)) {
            return res.json(getCrisisResponse());
        }

        const context = await ContextBuilder.buildUserContext(userId);
        const prompt = ContextBuilder.buildPrompt(context, message);

        const messageEmbedding = await embeddingService.generateEmbedding(message);

        const similarConversations = await pineconeService.queryEmbeddings(messageEmbedding);

        const enhancedPrompt = prompt + '\n\nRelevant past conversations:\n' +
            similarConversations.map(conv => conv.metadata.conversation).join('\n');

        const response = await geminiService.generateResponse(enhancedPrompt);

        const chat = new Chat({
            userId,
            messages: [
                { role: 'user', content: message },
                { role: 'assistant', content: response }
            ],
            embeddings: messageEmbedding
        });
        await chat.save();
        await pineconeService.storeEmbedding(
            chat._id.toString(),
            messageEmbedding,
            {
                userId: userId.toString(),
                conversation: `User: ${message}\nAssistant: ${response}`
            }
        );

        res.json({ response, needsHumanIntervention: false });
    } catch (error) {
        console.error('Chat API Error:', error);
        res.status(500).json({ 
            error: 'An error occurred processing your request',
            needsHumanIntervention: true 
        });
    }
});

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port: ${process.env.PORT}`);
});