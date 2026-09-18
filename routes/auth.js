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