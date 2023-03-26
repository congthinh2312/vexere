const {Ticket} = require("../models");

const createTicket = async (req, res) => {
    const {trip_id, user_id} = req.body;
    try {
        const newTicket = await Ticket.create({trip_id, user_id});
        res.status(201).send(newTicket);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createTicket,
};