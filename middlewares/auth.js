import userSchema from "../model/user.js";
import Jwt  from "jsonwebtoken";
export const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(404).json({
            success: true,
            message: "Login first"
        });
    }
    const decoded  = Jwt.verify(token, process.env.JWT_SECRET);
    const user = await userSchema.findById(decoded._id);
    req.user = user;
    next();
}