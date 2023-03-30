const express = require("express");
const session = require("express-session");
const router = express.Router();
const Cart = require('../models/cart')
const drinkProd = require('../models/drinkProd');
const mainProd = require('../models/mainProd');
const appetizerProd = require('../models/appetizerProd');

router.post("/add-to-cart/drink/:id", async function(req, res, next) {
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
router.post("/add-to-cart/main/:id", async function(req, res, next) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    try {
        const product = await mainProd.findById(productId);
        if (!product) {
            return res.redirect("/");
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect("/category/main");
    } catch (err) {
        next(err);
    }
});

router.post("/add-to-cart/appetizer/:id", async function(req, res, next) {
    const productId = req.params.id;
    const cart = new Cart(req.session.cart ? req.session.cart : {});

    try {
        const product = await appetizerProd.findById(productId);
        if (!product) {
            return res.redirect("/");
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect("/category/appetizer");
    } catch (err) {
        next(err);
    }
});

router.get("/cart", function(req, res, next) {
    if (!req.session.cart){
        return res.render('cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('cart', {products: cart.generateArray()});
});



module.exports = router;
