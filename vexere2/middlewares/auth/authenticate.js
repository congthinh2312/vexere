const jwt = require("jsonwebtoken");
//kiểm tra đăng nhập
const authenticate = (req, res, next) => {
    const token = req.header("token");
    try {
        const decode = jwt.verify(token, "cong-thinh-2312");
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

module.exports = {
    authenticate,
};