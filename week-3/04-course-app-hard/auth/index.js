const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

const SECRET = toString(process.env.SECRET);

const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decode = jwt.verify(token, SECRET);
        req.username = decode.username;
        next();
    } catch (err) {
        console.log(err);
        res.send(401).send("Invalid token");
    }
}

module.exports = { authMiddleware, SECRET };
