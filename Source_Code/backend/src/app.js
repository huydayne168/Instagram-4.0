const { env } = require("process");
require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const PORT = process.env.DB_PORT || 8000;
const sequelize = require("./api/models/index");
const cors = require("cors");
const credentials = require("./api/middlewares/credentials");
const corsOptions = require("./configs/cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { bodyParserUrlencodedConfigs } = require("./configs/bodyParser");
const router = require("./api/routes/index");

app.use(credentials);
app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ limit: "35mb" }));
app.use(bodyParser.urlencoded(bodyParserUrlencodedConfigs));

// router:
app.use("/v1/api", router);

// Error handling:
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.status || 500;
    const message = error.message;
    res.status(status).json({ message: message });
});

mongoose
    .connect(env.MONGODB_URI)
    .then((res) => {
        const server = app.listen(PORT, () => {
            console.log(">>>>>>>>>I AM RUNNING IN PORT:" + PORT + "<<<<<<<<<");
        });
        // const io = require("./socketio").init(server);
        // io.on("connection", (socket) => {
        //     console.log("Client connected!");
        //     socket.on("sendMess", (data) => {
        //         socket.broadcast.emit("receiveMess", data);
        //     });
        // });
    })
    .catch((err) => {
        console.log(err);
    });
