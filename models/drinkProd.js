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


module.exports = mongoose.model('drinkProd', productSchema);