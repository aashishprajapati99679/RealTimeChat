const JWT = require("jsonwebtoken");
const isAuthentiacated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const decode = await JWT.verify(token, process.env.JWT_SECRET);

        if (!decode) { 
            return res.status(401).json({
                message: "Invalid token",
                success: false
            })
        }
        req.id = decode.userId;
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}


module.exports = isAuthentiacated;