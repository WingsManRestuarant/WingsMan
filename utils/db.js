const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:admin@cluster0.u8eno7n.mongodb.net/wingman', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", () => console.log("Error in connecting to database"));
db.once("open", () => console.log("Connected to Database"));

module.exports = db;