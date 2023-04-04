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

const deleteTicket = async (req, res) => {
    const {id} = req.params;
    try {
        const deleteTicket = await Ticket.destroy({
            where: {
                id,
            },
        });
        res.status(200).send(deleteTicket);
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createTicket,
    deleteTicket,
};