// xác nhận loại người dùng (type)
const authorize = (arrType) => (req, res, next) => {
    const {user} = req;
    if (arrType.findIndex((ele) => ele === user.type) > -1) {
        next();
    } else {
        res.status(403).send("Bạn đã đăng nhập mà không có quyền");
    }
};

module.exports = {
    authorize
};