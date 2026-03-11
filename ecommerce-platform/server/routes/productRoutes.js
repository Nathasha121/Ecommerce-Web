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


//GET SINGLE PRODUCT BY ID
router.get('/:id',(req,res)=> {
    const productId =req.params.id;

    const sql = "SELECT * FROM products WHERE id = ?";
    db.query(sql ,[productId], (err,results) => {
      if (err )
        return res.status(500).json ({ error: err.message});

      if(results.length===0){
        return res.status(404).json({ message: "Product not found"});
    
      }
      res.json(results[0]);
  })
});


//UPDATE PRODUCT
router.put('/update/:id', (req, res) => {
    const productId = req.params.id;
    const {name, description, price, stock, image_url } = req.body;

    const sql = `
        UPDATE products
        SET name =?, description =?, price =?, stock =?, image_url =?
        WHERE id =?
        `;
    
    db.query(sql,[ name, description, price, stock, image_url, productId], (err, result) =>{
        if(err)
            return res.status(500).json( {error:err.message});

        if(result.affectedRows===0){
            return res.status(404).json({message: "Product not found"});
        }
        res.json({message: "Product updated successfully"});
    });

});

//DELETE PRODUCT
router.delete('/delete/:id', (req,res) =>{
    const productId =req.params.body;
    
    const sql = "SELECT * FROM products WHERE id= ?";

    db.query(sql, [productId], (err,result) =>{
        if(err)
            return res.status(500).json({error:err.message});

        if(result.affectedRows===0 ){
            return res.status(404).json({message:"Product not found"});
        }
        res.json({message: " Product deleted successfully"})
    });

});

module.exports = router;