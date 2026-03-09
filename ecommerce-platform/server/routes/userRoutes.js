const express=require('express');
const bcrypt=require('bcrypt');
const db= require('../config/db');
const jwt = require('jsonwebtoken')
const router = express.Router();

//LOGIN USER

router.post('/login', (req,res)=>{
    
    const {email, password} = req.body;
    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql,[email], async (err,results) => {
        if(err){
            return res.status(500).json({error: err.message});
        }
        if(results.length=== 0){
            return res.status(401).json({ message : "User not found"});
        }

        const user = results[0];

        const match = await bcrypt.compare(password,user.password);
        if(!match){
            return res.status(401).json({ message : "Invalid Password"})
        }

        //Create JWT token
        const token = jwt.sign(
            { id : user.id, 
            email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h"}
        );

        res.json({
            message : "Login Successful",
            token: token
        });
    });
});




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