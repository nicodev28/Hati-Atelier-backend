const jwt = require('jsonwebtoken');
const logger = require('../tools/logger');

const secret = process.env.JWT_SECRET || "MonPassword";
const expiry = process.env.JWT_EXPIRY || "3d";

let getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        username: user.username
    }, secret, {
        expiresIn: expiry
    });
}

let checkToken = (req, res, next) => {
    let token = req.headers.authorization;

    if (token) {
        token = token.replace("Bearer ", "")

        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                logger.log('error','Invalid token');
                return next(new Error("Invalid token"));
            }

            req.decoded = decoded;
            next();
        });
    } else {
        logger.log('error','No token provided');
        res.status(403).json({
            message: "No token provided"
        });
    }
}

module.exports = {
    getToken,
    checkToken
}