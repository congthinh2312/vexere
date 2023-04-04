const express = require("express");
const {createSeat, getAllSeat, getDetailSeat, updateSeat, deleteSeat} = require("../controllers/seat.controllers");
const {checkExist} = require("../middlewares/validations/checkExist");
const {authenticate} = require("../middlewares/auth/authenticate");
const {authorize} = require("../middlewares/auth/authorize");
const {Seat} = require("../models");
const seatRouter = express.Router();

seatRouter.post("/", authenticate, authorize(["ADMIN", "SUPER_ADMIN"]), createSeat);
seatRouter.get("/", getAllSeat);
seatRouter.get("/:id", checkExist(Seat), getDetailSeat);
seatRouter.put("/:id", authenticate, authorize(["ADMIN", "SUPER_ADMIN"]), checkExist(Seat), updateSeat);
seatRouter.delete("/:id", authenticate, authorize(["ADMIN", "SUPER_ADMIN"]), checkExist(Seat), deleteSeat);

module.exports = {
    seatRouter,
};