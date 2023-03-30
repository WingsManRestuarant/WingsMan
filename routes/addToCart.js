const express = require("express");
const session = require("express-session");
const router = express.Router();
const Cart = require('../models/cart')
const drinkProd = require('../models/drinkProd');

router.post("/add-to-cart/:id", async function(req, res, next) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    try {
        const product = await drinkProd.findById(productId);
        if (!product) {
            return res.redirect("/");
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect("/category/drink");
    } catch (err) {
        next(err);
    }
});

module.exports = router;
