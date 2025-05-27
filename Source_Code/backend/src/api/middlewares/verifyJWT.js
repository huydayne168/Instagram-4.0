require("dotenv").config();
const { env } = require("process");
const jwt = require("jsonwebtoken");

exports.verifyJWT = (req, res, next) => {
    if (req.headers.authorization) {
        const accessToken = req.headers.authorization.split(" ")[1];
        jwt.verify(accessToken, env.ACCESS_TOKEN_CODE, (error, decoded) => {
            if (error) {
                console.log(error);
                return res
                    .status(403)
                    .json({ message: "not same access token" });
            }
            req.currentUser = decoded.userInfo;
            next();
        });
    } else {
        res.status(403).json({ message: "no authentication header" });
    }
};
