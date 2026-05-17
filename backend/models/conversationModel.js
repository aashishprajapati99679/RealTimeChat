
const mongoose = require('mongoose');

const conversationModel = new mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }],
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    }]

}, { timestamps: true });

const Conversation = mongoose.model("Conversation", conversationModel);

module.exports = Conversation;