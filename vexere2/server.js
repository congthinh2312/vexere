const express = require("express"); //1
const path = require("path");//4
const {sequelize} = require("./models");//8
const { rootRouter } = require("./routers");//29
const Fingerprint = require("express-fingerprint");// phần mêm kiểm tra hệ điều hành của client
const app = express(); //2

// cài fingerprint
app.use(Fingerprint());

// cài ứng dụng sử dụng kiểu json
app.use(express.json());//3

// cài static file
const publicPathDirectory = path.join(__dirname, "./public");//5
app.use("/public", express.static(publicPathDirectory));//6

// dùng router
app.use("/api/v1", rootRouter);//30

// lắng nghe sự kiện kết nối
app.listen(3000, async () => {
    console.log("App listening on http://localhost:3000");//7
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      };//9
});
