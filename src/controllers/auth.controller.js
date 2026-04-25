import User from '../models/user.model.js';
import config from '../config/config.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

export async function register(req,res){   
        const {username,email,password}=req.body; 
        const isAlreadyRegistered=await User.findOne({
            $or:[
                {username},
                {email}
            ]
        });  
        if(isAlreadyRegistered){
            return res.status(409).json({
                success:false,
                message:"Username or email already exists"
            });
        }
        const hashedPassword=crypto.createHash("sha256").update(password).digest("hex");
        const newUser=await User.create({
            username,
            email,
            password:hashedPassword
        });   
        const token=jwt.sign({
            id:newUser._id},
            config.JWT_SECRET,
            {expiresIn:"1h"});
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            user:{
                id:newUser._id,
                username:newUser.username,
                email:newUser.email
            },
            token
        });
}


export async function getMe(req,res){
    const token=req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Authorization token is missing"
        });
    }
    const decoded=jwt.verify(token,config.JWT_SECRET);
    const user=await User.findById(decoded.id).select("-password");
    res.status(200).json({
        message:"User details fetched successfully",
        success:true,
        user:user.username,
        email:user.email,
    });
}
