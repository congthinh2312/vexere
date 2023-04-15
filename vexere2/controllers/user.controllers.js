const { User, sequelize, Ticket } = require("../models");
const bcrypt = require("bcryptjs"); // mã hóa password
const jwt = require("jsonwebtoken");
const gravatarUrl = require("gravatar-url"); // tạo avatar mặc định
const nodemailer = require("nodemailer");

const register = async (req, res) => {
  const { name, email, password, numberPhone } = req.body;
  try {
    // tạo avatar mặc định
    const avatarUrl = gravatarUrl(email);
    // tạo ra một chuỗi ngẫu nhiên
    const salt = bcrypt.genSaltSync(10);
    // mã hóa salt + password
    const hashPassword = bcrypt.hashSync(password, salt);
    const newRegister = await User.create({
      name,
      email,
      password: hashPassword,
      numberPhone,
      avatar: avatarUrl,
    });
    res.status(201).send(newRegister);
  } catch (error) {
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    const isAuth = bcrypt.compareSync(password, user.password);
    if (isAuth) {
      const token = jwt.sign(
        { email: user.email, type: user.type },
        "auth",
        { expiresIn: 60 * 60 }
      );
      res.status(200).send({ message: "Đăng nhập thành công !", token });
    } else {
      res.status(500).send({ message: "Tài khoản hoặc mật khẩu không đúng" });
    }
  } else {
    res.status(404).send({ message: "không tìm thấy email phù hợp" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if(!email){
    return res.status(400).send({message: "Email is required"})
  }
  User.findOne({ where:{email} }, (err, user) => {
    if (err || !user) {
      return res.status(404).send({ message: 'User not found' });
    }
  const token = jwt.sign({id: user.id}, "resetpass", {expiresIn: 60*60});
  const transporter = nodemailer.createTransport({
    service: "email",
    auth: {
      user: "babayaga.jw00@gmail.com",
      pass: "",
    },
  });
  const mailOptions = {
    from: "babayaga.jw00@gmail.com",
    to: `${email}`,
    subject: "Reset Password Link",
    html: `
    <p>Please click the following link to reset your password:</p>
    <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
    <hr />
    <p>This email may contain sensitive information</p>
    <p>${process.env.CLIENT_URL}</p>
  `,
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      return res.status(500).send({ message: 'Internal server error' });
    }
    res.status(200).send({ message: 'Reset password link sent to your email' });
  });
});
};

const resetPassword = async (req, res) => {
  const {user} = req;
  const {password} = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const reset = await User.update({password: hashPassword},{
      where: {
        user,
      },
    });
    res.status(200).send(`reset thành công ${password}`);
  } catch (error) {
    res.status(500).send(error);
  }
};

const uploadAvatar = async (req, res) => {
  const { file } = req;
  const urlImage = `http://localhost:3000/${file.path}`;
  const { user } = req;
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
  const { id } = req.params;
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
  forgotPassword,
  resetPassword,
  uploadAvatar,
  getAllTrip,
  getDetailTrip,
};
