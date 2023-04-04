const {User, sequelize, Ticket} = require("../models");
const bcrypt = require("bcryptjs");// mã hóa password
const jwt = require("jsonwebtoken");
const gravatarUrl = require("gravatar-url");// tạo avatar mặc định

const register = async (req, res) => {
    const {name, email, password, numberPhone} = req.body;
    try {
        // tạo avatar mặc định
        const avatarUrl = gravatarUrl(email);
        // tạo ra một chuỗi ngẫu nhiên
        const salt = bcrypt.genSaltSync(10);
        // mã hóa salt + password
        const hashPassword = bcrypt.hashSync(password, salt);
        const newRegister = await User.create({name, email, password: hashPassword, numberPhone, avatar: avatarUrl});
        res.status(201).send(newRegister);
    } catch (error) {
        res.status(500).send(error);
    }
};

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({
        where: {
            email,
        },
    });
    if (user) {
        const isAuth = bcrypt.compareSync(password, user.password);
        if (isAuth) {
            const token = jwt.sign({email: user.email, type: user.type}, "cong-thinh-2312", {expiresIn: 60 * 60});
            res.status(200).send({message: "Đăng nhập thành công !", token});
        }else{
            res.status(500).send({message: "Tài khoản hoặc mật khẩu không đúng"});
        }
    } else {
        res.status(404).send({message: "không tìm thấy email phù hợp"});
    }
};

const uploadAvatar = async (req, res) => {
    const {file} = req;
    const urlImage = `http://localhost:3000/${file.path}`;
    const {user} = req;
    const userFound = await User.findOne({
        email: user.email,
    });
    userFound.avatar = urlImage;
    await userFound.save();
    res.send(userFound);
};

const getAllTrip = async (req, res) => {
    try {
        const [results] = await sequelize.query(
            `select users.name as userName, fromSta.name as fromStation, toSta.name as toStation from users
            inner join tickets on users.id = tickets.user_id
            inner join trips on trips.id = tickets.trip_id
            inner join stations as fromSta on fromSta.id = trips.fromStation
            inner join stations as toSta on toSta.id = trips.toStation;`
        );
        res.send(results);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getDetailTrip = async (req, res) => {
    const {id} = req.params;
    const detailTrip = await Ticket.findOne({
        where: {
            id,
        },
    });
    if (detailTrip) {
        const [results] = await sequelize.query(
            `select users.name as userName, fromSta.name as fromStation, toSta.name as toStation from users
            inner join tickets on users.id = tickets.user_id
            inner join trips on trips.id = tickets.trip_id
            inner join stations as fromSta on fromSta.id = trips.fromStation
            inner join stations as toSta on toSta.id = trips.toSta`
        );
        res.send(results);
    } else {
        res.send(`Không tìm thấy ${id}`);
    }
};

module.exports = {
    register,
    login,
    uploadAvatar,
    getAllTrip,
    getDetailTrip,
};