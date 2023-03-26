const express = require("express");//24
const {stationRouter} = require("./station.routers");//26
const {tripRouter} = require("./trip.routers");
const {passengerCarCompanieRouter} = require("./passengerCarCompanie.routers");
const {vehicleRouter} = require("./vehicle.routers");
const {seatRouter} = require("./seat.routers");
const {userRouter} = require("./user.routers");
const {fingerPrintRouter} = require("./test-finger-print");
const {ticketRouter} = require("./ticket.routers");
const rootRouter = express.Router();//25

rootRouter.use("/stations", stationRouter);//27
rootRouter.use("/trips", tripRouter);
rootRouter.use("/passengerCarCompanies", passengerCarCompanieRouter);
rootRouter.use("/vehicle", vehicleRouter);
rootRouter.use("/seats", seatRouter);
rootRouter.use("/users", userRouter);
rootRouter.use("/test-finger-print", fingerPrintRouter);
rootRouter.use("/tickets", ticketRouter);

module.exports = {
    rootRouter,//28
};
