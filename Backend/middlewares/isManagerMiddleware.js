const User = require("../models/User");

const isManagerMiddleware = async (req, res, next) => {
    try {
        const user = await User.findById({_id: req.body.id});
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }
        if (user.role !== "manager") {
            return res.status(403).json({
                message: "You are not authorized to perform this action",
                success: false,
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            success: false,
            error,
        });
    }
};

module.exports = isManagerMiddleware;