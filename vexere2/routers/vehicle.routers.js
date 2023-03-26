const express = require("express");
const {createVehicle, getAllVehicle, getDetailVehicle, updateVehicle, deleteVehicle} = require("../controllers/vehicle.controllers");
const vehicleRouter = express.Router();

vehicleRouter.post("/", createVehicle);
vehicleRouter.get("/", getAllVehicle);
vehicleRouter.get("/:id", getDetailVehicle);
vehicleRouter.put("/:id", updateVehicle);
vehicleRouter.delete("/:id", deleteVehicle);

module.exports = {
    vehicleRouter,
};

