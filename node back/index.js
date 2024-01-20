const express = require("express");
const morgan = require("morgan");
require("dotenv").config();
const dbConnection = require("./configuration/config");
const PORT = process.env.PORT;
const defaultRoute = require("./route/routesForAllUsers/defaultRoute");
const loginAuth = require("./middleware/middlewareLoginAuth");
const fs = require("fs");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

const imagesDir = "images";
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}
app.use(`/${imagesDir}`, express.static(imagesDir));


// Middleware To log all action happen to DB
app.use(
    morgan(
        '"Method: :method - URL: :url - STATUS: :status - RESPONSE TIME: :response-time ms - DATE: :date[clf]"',
        {
            stream: fs.createWriteStream("./logs/logs.txt", { flags: "a" }),
        }
    )
);

app.use("/", [defaultRoute]);

app.listen(PORT, (err) => {
    if (!err) {
        console.log(
            `*-----------------Server running on ${PORT}------------------*`
        );
        dbConnection;
    } else {
        console.log(`*-----------------Error in Server---------------*`);
    }
});
