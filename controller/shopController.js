const Product = require('../models/Product');

exports.getAllProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.render('drink', { products });
        })
        .catch(err => console.log(err));
};

exports.getProductDetail = (req, res, next) => {
    Product.findById(req.params.prodId)
        .then(product => {
            res.render('product-detail', { prod: product, pageTitle: 'Product Detail', path: '/', name: 'Edward' });
        })
        .catch(err => console.log(err));
}

exports.addToCart = (req, res, next) => {
    req.user.addToCart(req.body.id)
        .then(() => {
            res.redirect('/cart');
        }).catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            console.log(user);
            res.render('cart', { cart: user.cart, pageTitle: 'Shopping Cart Detail', path: '/cart', name: 'Edward' });
        })
        .catch(err => console.log(err));
}
