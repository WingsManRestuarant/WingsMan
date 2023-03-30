const express = require("express");
const router = express.Router();

function drinkRoute(drinkProd) {
  router.get("/", function(req, res, next) {
    drinkProd.find()
      .then(function(docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
          productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render("drink", { title: 'Shopping Cart', productChunks: productChunks });
      })
      .catch(function(err) {
        return next(err);
      });
  });
  return router;
}

module.exports = drinkRoute;
