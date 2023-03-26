const {Seat} = require("../models");

const createSeat = async (req, res) => {
    const {name, vehicled_id, status} = req.body;
    try {
        const newSeat = await Seat.create({name, vehicled_id, status});
        res.status(201).send(newSeat);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllSeat = async (req, res) => {
    try {
        const getListSeat = await Seat.findAll();
        res.status(200).send(getListSeat);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getDetailSeat = async (req, res) => {
    const {id} = req.params;
    try {
        const detailSeat = await Seat.findOne({
            where: {
                id,
            },
        });
        res.status(200).send(detailSeat);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateSeat = async (req, res) => {
    const {id} = req.params;
    const {name, vehicled_Id, status} = req.body;
    try {
        const detailSeat = await Seat.findOne({
            where: {
                id,
            },
        });
        detailSeat.name = name;
        detailSeat.vehicled_id = vehicled_id;
        detailSeat.status = status;
        await detailSeat.save();
        res.status(200).send(detailSeat);
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteSeat = async (req, res) => {
    const {id} = req.params;
    try {
        Seat.destroy({
            where: {
                id,
            },
        });
        res.status(200).send("xóa thành công");
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createSeat,
    getAllSeat,
    getDetailSeat,
    updateSeat,
    deleteSeat
};