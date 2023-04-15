const jwt = require("jsonwebtoken");
//kiểm tra đăng nhập
const authenticate = (req, res, next) => {
    const token = req.header("token");
    try {
        const decode = jwt.verify(token, "auth");
        if (decode) {
            req.user = decode;
            return next();
        } else {
            res.status(401).send("Bạn Chưa Đăng Nhập");
        }
    } catch (error) {
        res.status(401).send("Bạn Chưa Đăng Nhập");
    }
};

const authenticatePassword = (req, res, next) => {
    const token = req.header("token");
    try {
        const decode = jwt.verify(token, "resetpass");
        if (decode) {
            req.user = decode;
            return next();
        } else {
            res.status(401).send("Mã xác nhận không đúng");
        }
    } catch (error) {
        res.status(401).send("Mã xác nhận không đúng");
    }
};

module.exports = {
    authenticate,
    authenticatePassword,
};