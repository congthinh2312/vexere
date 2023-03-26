const express = require("express");
const {createTicket} = require("../controllers/ticket.controllers");
const ticketRouter = express.Router();

ticketRouter.post("/", createTicket);

module.exports = {
    ticketRouter,
};