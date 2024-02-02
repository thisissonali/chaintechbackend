import  Jwt  from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config();
export const sendCookie = (user, res, message, statuscode = 200) => {
  const token = Jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    res.status(statuscode).cookie("token",token, {
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        sameSite:"none",
        secure: true,
    }).json({
        success: true,
        message,
    })   
}
