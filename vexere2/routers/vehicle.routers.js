const express = require("express");
const {createVehicle, getAllVehicle, getDetailVehicle, updateVehicle, deleteVehicle} = require("../controllers/vehicle.controllers");
const {vehicle} = require("../models");
const {checkExist} = require("../middlewares/validations/checkExist");
const {authenticate} = require("../middlewares/auth/authenticate");
const {authorize} = require("../middlewares/auth/authorize");
const vehicleRouter = express.Router();

vehicleRouter.post("/", authenticate, authorize(["ADMIN", "SUPER_ADMIN"]), createVehicle);
vehicleRouter.get("/", getAllVehicle);
vehicleRouter.get("/:id", checkExist(vehicle), getDetailVehicle);
vehicleRouter.put("/:id", authenticate, authorize(["ADMIN", "SUPER_ADMIN"]), checkExist(vehicle), updateVehicle);
vehicleRouter.delete("/:id", authenticate, authorize(["ADMIN", "SUPER_ADMIN"]), checkExist(vehicle), deleteVehicle);

module.exports = {
    vehicleRouter,
};

