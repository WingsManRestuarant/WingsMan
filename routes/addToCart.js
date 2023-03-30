const express = require("express");
const session = require("express-session");
const router = express.Router();
const Cart = require('../models/cart')
const drinkProd = require('../models/drinkProd');

router.get("/add-to-cart/:id", function(req,res,next){
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    drinkProd.findById(productId, function(err, product){
        if (err){
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart)
        res.redirect('/');
    
    });
});

module.exports = router;