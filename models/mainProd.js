const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    imagePath:{
        type:String
    },
    title: {
        type: String,
        required: true
    },
    price: Number,
    description: String

});

// model name: 'Product' will be used to turn into a collection name in DB
// 'Product' => 'product' + 's' => products
module.exports = mongoose.model('mainProd', productSchema);