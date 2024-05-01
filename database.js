const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/apparel-db");

const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", (err) => console.log("Connected to DB!"));

module.exports = db;
