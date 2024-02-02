import mongoose from "mongoose";
import userSchema from "../model/user.js";
import ErrorHandler from "../middlewares/error.js";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { sendCookie } from "../utils/features.js";

dotenv.config();

export const register = async (req, res) => { 
    const { name, email, password } = req.body;

    let user = await userSchema.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User already exists", 404));
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await userSchema.create({
        name,
        email,
        password: hashedPassword
    })
    sendCookie(user, res, "Registered Successfully", 201);
}

export const login = async (req, res , next) => { 
    try {
       const { email, password } = req.body;

        let user = await userSchema.findOne({ email: email });
        if (!user) {
            return next(new ErrorHandler("Register first", 404));    
        }
        const confirmPassword = await bcrypt.compare(password , user.password);
        if (!confirmPassword) {
            return next(new ErrorHandler("Invalid password", 404));
        }
        sendCookie(user, res, `Welcome back ${user.name}`, 200)
    } catch (error) {
        console.log(error);
    }
}

export const getMyDetails = async (req, res, next) => {
    try {
        const  {id}  = req.params;
        const user = await userSchema.findById(id);
        if (!user) {
            return next(new ErrorHandler("user Not Found", 404));
        }
       
        res.status(200).json({
        success: true,
        user:req.user,
       })
    } catch (error) {
        console.log(error);
    }
}

export const updateMyDetails = async (req, res, next) => { 
   try {
     const  {id}  = req.params;
     const user = await userSchema.findById(id);
     if (!user) {
        return next(new ErrorHandler("user not found",404));
     }
       user.name = req.body.name;
       user.email = req.body.email;
       
       const hashedPassword = await bcrypt.hash(user.password, 10);

       user.password = hashedPassword;
    
     await user.save();
    
     res.status(200).json({
        success: true,
        message: "Details updated successfully",
        user
     })   
    } catch (error) {
        console.log(error);
    }
}
export const logout = async (req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: "none",
        secure: true
     }).json({
        success: true,
        message:"Logout successfully",
    })
}
