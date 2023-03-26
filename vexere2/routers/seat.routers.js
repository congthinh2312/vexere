const express = require("express");
const {createSeat, getAllSeat, getDetailSeat, updateSeat, deleteSeat} = require("../controllers/seat.controllers");
const seatRouter = express.Router();

seatRouter.post("/", createSeat);
seatRouter.get("/", getAllSeat);
seatRouter.get("/:id", getDetailSeat);
seatRouter.put("/:id", updateSeat);
seatRouter.delete("/:id", deleteSeat);

module.exports = {
    seatRouter,
};