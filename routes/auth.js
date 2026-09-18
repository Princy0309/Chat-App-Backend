const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.post('/register', async(req, res)=>{
    try{
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "user already exists"})
        }

        const hashedPswd = await bcrypt.hash(password, 10);

        const user = await User.create({
            username,
            email,
            password: hashedPswd
        });
        
        res.status(201).json({message: "user resgistered successfully"});

    }catch(err){
        res.status(500).json({message: 'Server error', error: err.message});
    }
});

router.post('/login', async(req, res)=>{
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message : "invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid credentials"})
        }
        const token = jwt.sign(
            {userId: user._id, username: user.username},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        );

        res.json({token, username: user.username});

    }catch(err){
        res.status(500).json({message: "server error", error: err.message});
    }
})

module.exports = router;