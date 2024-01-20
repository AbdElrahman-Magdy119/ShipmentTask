const mongoose = require("mongoose");
const donenv = require("dotenv").config();
const DB_URL = process.env.DB_URL;

const dbConnection = mongoose.connect(DB_URL, (err) => {
    if (!err) return console.log(
        `*-------------------Database Connected--------------------*`
    );
    return console.log(`-------------------Error In Database-------------------`);
})


module.exports = dbConnection;
