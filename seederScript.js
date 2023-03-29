const productsData = require('./data/products');
const db = require('./utils/db');
const Product = require('./models/Product');


const importData = async () => {
    try {
        await Product.deleteMany({});

        await Product.insertMany(productsData);

        console.log("Data IMPORTED");

        process.exit();
    } catch (error){
        console.error("Error with data import");
        process.exit(1);
    }
}

importData();
