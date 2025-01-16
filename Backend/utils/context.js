const User = require('../models/User');
const Chat = require('../models/Chat');

class ContextBuilder {
    static async buildUserContext(userId) {
        const user = await User.findById(userId);
        if (!user) throw new Error('User not found');

        const recentChats = await Chat.find({ userId })
            .sort({ createdAt: -1 })
            .limit(5);

        return {
            addictions: user.addictions,
            currentStreak: user.streaks.currentStreak,
            recentMoods: user.moodLogs.slice(-5),
            startDate: user.streaks.startDate,
            recentChats: recentChats.map(chat => ({
                role: chat.messages[chat.messages.length - 1].role,
                content: chat.messages[chat.messages.length - 1].content
            }))
        };
    }

    static buildPrompt(context, userMessage) {
        return `
        Context:
        - Current sobriety streak: ${context.currentStreak} days
        - Struggling with: ${context.addictions.join(', ')}
        - Recent moods: ${context.recentMoods.map(m => m.mood).join(', ')}
        
        Recent conversation history:
        ${context.recentChats.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

        User message: "${userMessage}"

        Instructions:
        1. Show empathy and understanding
        2. Provide accurate health information when relevant
        3. Celebrate progress and encourage continued recovery
        4. Suggest practical coping strategies
        5. Maintain a hopeful, recovery-focused tone
        6. Avoid triggering language or detailed substance discussions
        7. If user seems in crisis, provide immediate support resources

        Please provide a supportive and informative response:`;
    }
}

module.exports = ContextBuilder;