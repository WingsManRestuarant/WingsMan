const mongoose = require("mongoose");
const products = require("../data/products");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
//   ,cart: {
//     items: [{
//         productId: {
//             type: mongoose.Types.ObjectId,
//             ref: 'products',
//             required: true
//         },
//         qty: {
//             type: Number,
//             required: true
//         }
//     }],
//     totalPrice: Number
// }
});

// userSchema.methods.addToCart = async function(productId) {
//   const product = await products.findById(productId);
//   if (products) {
//       const cart = this.cart;
//       const isExisting = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(products._id).trim());
//       if (isExisting >= 0) {
//           cart.items[isExisting].qty += 1;
//       } else {
//           cart.items.push({ productId: product._id, qty: 1 });
//       }
//       if (!cart.totalPrice) {
//           cart.totalPrice = 0;
//       }
//       cart.totalPrice += product.price;
//       return this.save();
//   }

// };

const User = mongoose.model("User", userSchema);

module.exports = User;
