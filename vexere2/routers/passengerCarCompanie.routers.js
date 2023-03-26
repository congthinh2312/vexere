const express = require("express");
const {createCarCompanie, getAllCarCompanie, getDetailCarCompanie, updateCarCompanie, deleteCarCompanie} = require("../controllers/passengerCarCompanie.controllers");
const passengerCarCompanieRouter = express.Router();

passengerCarCompanieRouter.post("/", createCarCompanie);
passengerCarCompanieRouter.get("/", getAllCarCompanie);
passengerCarCompanieRouter.get("/:id", getDetailCarCompanie);
passengerCarCompanieRouter.put("/:id", updateCarCompanie);
passengerCarCompanieRouter.delete("/:id", deleteCarCompanie);

module.exports = {
    passengerCarCompanieRouter,
};