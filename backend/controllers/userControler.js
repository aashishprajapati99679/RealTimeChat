const { User } = require("../models/userModel");
const Conversation = require("../models/conversationModel");
const bcryptjs = require("bcryptjs");
const JWT = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const {
            fullName,
            userName,
            password,
            confirmPassword,
            profilePhoto, 
            gender
        } = req.body;

        if (!fullName || !userName || !password || !confirmPassword || !gender) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Password and confirm password do not match"
            });
        }

        const user = await User.findOne({ userName });

        if (user) {
            return res.status(400).json({
                message: "Username already exists"
            });
        }

        const hashedPassword = await bcryptjs.hash(password, 10);
        const maleProfilePhoto =
            `https://avatar.iran.liara.run/public/boy?username=${userName}`;

        const femaleProfilePhoto =
            `https://avatar.iran.liara.run/public/girl?username=${userName}`;

        // Create user
        await User.create({
            fullName,
            userName,
            password: hashedPassword,
            profilePhoto:
                gender === "male"
                    ? maleProfilePhoto
                    : femaleProfilePhoto,
            gender
        });

        return res.status(201).json({
            message: "User registered successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

const login = async (req, res) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        };
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false
            })
        };
        const isPasswordMatch = await bcryptjs.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid Password",
                success: false
            })
        };
        const tokendata = {
            userId: user._id
        };

        const token = await JWT.sign(tokendata, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" }).json({
            _id: user._id,
            userName: user.userName,
            fullName: user.fullName,
            profilePhoto: user.profilePhoto,
            about: user.about,
            phone: user.phone
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0, }).json({
            message: "logged Out Successfully",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

        const usersWithConversations = await Promise.all(otherUsers.map(async (user) => {
            const conversation = await Conversation.findOne({
                participants: { $all: [loggedInUserId, user._id] }
            }).populate("messages");

            let lastMessage = null;
            let unreadCount = 0;

            if (conversation && conversation.messages.length > 0) {
                lastMessage = conversation.messages[conversation.messages.length - 1];
                unreadCount = conversation.messages.filter(
                    msg => msg.senderId.toString() === user._id.toString() && !msg.isRead
                ).length;
            }

            return {
                ...user.toObject(),
                lastMessage,
                unreadCount
            };
        }));

        return res.status(200).json({
            otherUsers: usersWithConversations,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

const updateProfile = async (req, res) => {
    try {
        const userId = req.id;
        const { fullName, about, phone } = req.body;
        let profilePhotoUrl = req.body.profilePhoto; // Default to body if string URL is provided

        if (req.file) {
            profilePhotoUrl = `http://localhost:8080/uploads/${req.file.filename}`;
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { fullName, about, phone, ...(profilePhotoUrl && { profilePhoto: profilePhotoUrl }) },
            { new: true }
        ).select("-password");

        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user: {
                _id: updatedUser._id,
                userName: updatedUser.userName,
                fullName: updatedUser.fullName,
                profilePhoto: updatedUser.profilePhoto,
                about: updatedUser.about,
                phone: updatedUser.phone
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

module.exports = { register, login, logout, getOtherUsers, updateProfile };