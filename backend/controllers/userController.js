const asyncHandler = require("express-async-handler")
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

const registerUser = asyncHandler (async (req,res) => {
    const {name,email,password,pic} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User Already Exist');
    }

    const user = await User.create({
        name,email,password,pic,
    })

    if(user){
        res.status(201).json({
            id:user._id,
            name : user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            pic:user.pic,
            token:generateToken(user._id)
            
        })
    }
    else{
        res.status(400)
        throw new Error("something went wrong")
    }
    
});

const authUser = asyncHandler (async (req,res) => {
    const {email,password} = req.body;
    const user = await User.findOne({email});

    if(user && await user.matchPassword(password)){
        res.status(201).json({
            id:user._id,
            name : user.name,
            email:user.email,
            isAdmin:user.isAdmin,
            pic:user.pic,
            token:generateToken(user._id)
            
        })
    }

    
    else{
        res.status(400)
        throw new Error("Invalid Credentials")
    }
    
});

module.exports = {registerUser , authUser};