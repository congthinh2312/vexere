const express = require("express");//19
const {createStation, getAllStation, getDetailStation, updateStation, deleteStation} = require("../controllers/station.controllers");//21
const {checkExist} = require("../middlewares/validations/checkExist");//55
const {authenticate} = require("../middlewares/auth/authenticate");
const {authorize} = require("../middlewares/auth/authorize")
const {Station} = require("../models");//56
const stationRouter = express.Router();//20

stationRouter.post("/", authenticate, authorize(["ADMIN", "SUPER_ADMIN"]), createStation);//22
stationRouter.get("/", getAllStation);//34
stationRouter.get("/:id", checkExist(Station), getDetailStation);//37
stationRouter.put("/:id", checkExist(Station), updateStation);//43  //57 checkExist(Station)
stationRouter.delete("/:id", authenticate, checkExist(Station), deleteStation);//48  //58 checkExist(Station)

module.exports = {
    stationRouter,//23
};