import User from '../models/user.model.js';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

async function register(req,res){
    
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
            process.env.JWT_SECRET,
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

export {register};
