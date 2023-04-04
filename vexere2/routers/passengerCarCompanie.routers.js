const express = require("express");
const {createCarCompanie, getAllCarCompanie, getDetailCarCompanie, updateCarCompanie, deleteCarCompanie} = require("../controllers/passengerCarCompanie.controllers");
const {checkExist} = require("../middlewares/validations/checkExist");
const {authenticate} = require("../middlewares/auth/authenticate");
const {authorize} = require("../middlewares/auth/authorize");
const {PassengerCarCompanie} = require("../models");
const passengerCarCompanieRouter = express.Router();

passengerCarCompanieRouter.post("/", authenticate, authorize(["ADMIN", "SUPER_ADMIN"]), createCarCompanie);
passengerCarCompanieRouter.get("/", getAllCarCompanie);
passengerCarCompanieRouter.get("/:id", checkExist(PassengerCarCompanie), getDetailCarCompanie);
passengerCarCompanieRouter.put("/:id", authenticate, checkExist(PassengerCarCompanie), authorize(["ADMIN", "SUPER_ADMIN"]), updateCarCompanie);
passengerCarCompanieRouter.delete("/:id", authenticate, checkExist(PassengerCarCompanie), authorize(["ADMIN", "SUPER_ADMIN"]), deleteCarCompanie);

module.exports = {
    passengerCarCompanieRouter,
};