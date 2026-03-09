const express =require('express');
const db = require('../config/db');

const router = express.Router();

//ADD PRODUCT
router.post('/add', (req, res) => {

    const {name, description,price, stock , image_url} = req.body;
    const sql = "INSERT INTO products (name, description, price, stock , image_url) VALUES (?,?,?,?,?)";
    
   db.query(sql,[name, description,price,stock,image_url] , (err,result) =>{
    if(err){
        return res.status(500).json({error :err.message});
    }
    res.json({ message : "Product added successfully"});
   });
});

//GET ALL PRODUCTS
router.get('/', (req, res) => {

     const sql = "SELECT * FROM products";
     db.query(sql, (err,results) =>{
        if (err){
            return res.status(500).json({ error: err.message});
        }
        res.json(results);
     });
});





module.exports = router;