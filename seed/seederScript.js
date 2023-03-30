const drinkData = require('../data/drinkProd');
const appetizerData = require('../data/appetizerProd');
const mainData = require('../data/mainProd');
const db = require('../utils/db');
const Product1 = require('../models/appetizerProd');
const Product2 = require('../models/drinkProd');
const Product3 = require('../models/mainProd');


const importData = async () => {
    try {
        await Product1.deleteMany({});
        await Product2.deleteMany({});
        await Product3.deleteMany({});
        
        await Product1.insertMany(appetizerData);
        await Product2.insertMany(drinkData);
        await Product3.insertMany(mainData);

        console.log("Data IMPORTED");

        process.exit();
    } catch (error){
        console.error("Error with data import");
        process.exit(1);
    }
}

importData();
