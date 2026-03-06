const express=require('express');
const bcrypt=require('bcrypt');
const db= require('../config/db');

const router = express.Router();

//REGISTER USER
router.post('/register',async(req,res) =>{
    const{username, email,password }= req.body;

    try{
        //Hash Password
        const hashedPassword = await bcrypt.hash(password,10);

        //Insert user into database
        const sql = "INSERT INTO users(username, email,password) VALUES (?, ?, ?)";
        
        db.query(sql,[username,email, hashedPassword], (err, result) =>{                                  
            if(err){
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({message:"User registered successfully"});

        });
    }catch(error){
        res.status(500).json({error:error.message});
    }
});

module.exports = router;