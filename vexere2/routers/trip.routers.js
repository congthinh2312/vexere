const express = require("express");
const {createTrip, getAllTrip, getDetailTrip, updateTrip, deleteTrip} = require("../controllers/trip.controllers");
const {checkExist} = require("../middlewares/validations/checkExist");
const {Trip} = require("../models");
const {authenticate} = require("../middlewares/auth/authenticate");
const {authorize} = require("../middlewares/auth/authorize");
const tripRouter = express.Router();

tripRouter.post("/", authenticate, authorize(["ADMIN", "SUPER_ADMIN"]), createTrip);
tripRouter.get("/", getAllTrip);
tripRouter.get("/:id", checkExist(Trip), getDetailTrip);
tripRouter.put("/:id", authenticate, authorize(["ADMIN", "SUPER_ADMIN"]), checkExist(Trip), updateTrip);
tripRouter.delete("/:id", authenticate, authorize(["ADMIN", "SUPER_ADMIN"]), checkExist(Trip), deleteTrip);

module.exports = {
    tripRouter,
};