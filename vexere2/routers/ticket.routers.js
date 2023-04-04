const express = require("express");
const {createTicket, deleteTicket} = require("../controllers/ticket.controllers");
const {authenticate} = require("../middlewares/auth/authenticate");
const {checkExist} = require("../middlewares/validations/checkExist");
const {Ticket} = require("../models");
const ticketRouter = express.Router();

ticketRouter.post("/", authenticate, createTicket);
ticketRouter.delete("/:id", authenticate, checkExist(Ticket), deleteTicket);

module.exports = {
    ticketRouter,
};