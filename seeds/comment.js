const { Comment } = require('../models');

const comment_data = [
    {
        comment_text: "Thank you for sharing!",
        user_id: 1,
        post_id: 5,
        
    },
    {
        comment_text: "I can't believe it!",
        user_id: 2,
        post_id: 4,
        
    },
    {
        comment_text: "What are your sources for this information?",
        user_id: 3,
        post_id: 3,
        
    },
    {
        comment_text: "This is a great perspective, thanks for sharing!",
        user_id: 4,
        post_id: 2,
        
    },
    {
        comment_text: "I'd love to learn more, could you provide more resources?",
        user_id: 5,
        post_id: 1,
    }    
];

const seedComments = () => Comment.bulkCreate(comment_data);

module.exports = seedComments;