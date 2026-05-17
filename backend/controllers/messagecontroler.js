const Conversation = require("../models/conversationModel");
const { Message } = require("../models/messageModel");
const { io, getReciverSocketId } = require("../socket/socket");

const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body;

        let gotConversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        });

        if (!gotConversation) {
            gotConversation = await Conversation.create({
                participants: [senderId, receiverId]
            })
        };

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        })

        if (newMessage) {
            gotConversation.messages.push(newMessage._id);
            await gotConversation.save();
        };

        const receiverSocketId = getReciverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        return res.status(201).json(newMessage);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const getMessages = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;

        const conversation = await Conversation.findOne({
            participants: {
                $all: [senderId, receiverId]
            }
        }).populate("messages");

        if (!conversation) {
            return res.status(200).json({
                messages: []
            });
        }



        return res.status(200).json({
            messages: conversation.messages
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

module.exports = { sendMessage, getMessages };