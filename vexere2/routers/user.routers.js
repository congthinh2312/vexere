const express = require("express");
const {register, login, uploadAvatar, getAllTrip, getDetailTrip} = require("../controllers/user.controllers");
const {uploadImage} = require("../middlewares/upload/upload-image");
const {authenticate} = require("../middlewares/auth/authenticate");
const {alreadyExist} = require("../middlewares/validations/alreadyExist");
const {User} = require("../models");
const userRouter = express.Router();

userRouter.post("/register", alreadyExist(User), register);
userRouter.post("/login", login);
userRouter.post("/upload-avatar", authenticate, uploadImage("user"), uploadAvatar);
userRouter.get("/all-trip", getAllTrip);
userRouter.get("/:id", getDetailTrip);

module.exports = {
    userRouter,
};