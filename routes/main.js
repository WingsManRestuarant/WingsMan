const express = require("express");
const router = express.Router();

function mainRoute(mainProd) {
  router.get("/", function(req, res, next) {
    mainProd.find()
      .then(function(docs) {
        var productChunks = [];
        var chunkSize = 3;
        for (var i = 0; i < docs.length; i += chunkSize) {
          productChunks.push(docs.slice(i, i + chunkSize));
        }
        res.render("main", { title: 'Shopping Cart', productChunks: productChunks });
      })
      .catch(function(err) {
        return next(err);
      });
  });
  return router;
}

module.exports = mainRoute;