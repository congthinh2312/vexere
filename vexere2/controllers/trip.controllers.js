const {Trip, Station} = require("../models");

const createTrip = async (req, res) => {
    const {fromStation, toStation, startTime, price} = req.body;
    try {
        const newTrip = await Trip.create({fromStation, toStation, startTime, price});
        res.status(201).send(newTrip); 
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllTrip = async (req, res) => {
    try {
        const tripList = await Trip.findAll({
            include: [
                {
                    model: Station,
                    as: "from",
                },
                {
                    model: Station,
                    as: "to",
                },
            ],
        });
        res.status(200).send(tripList);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getDetailTrip = async (req, res) => {
    const {id} = req.params;
    try {
        const tripDetail = await Trip.findOne({
            where: {
                id,
            },
            include: [
                {
                    model: Station,
                    as: "from",
                },
                {
                    model: Station,
                    as: "to"
                },
            ],
        });
        res.status(200).send(tripDetail);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateTrip = async (req, res) => {
    const {id} = req.params;
    const {fromStation, toStation, startTime, price} = req.body;
    try {
        await Trip.update(
            {fromStation, toStation, startTime, price},
            {
                where: {
                    id,
                },
            },
        );
        res.status(200).send(`update thành công với id là ${id}`);
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteTrip = async (req, res) => {
    const {id} = req.params;
    try {
        await Trip.destroy({
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
    createTrip,
    getAllTrip,
    getDetailTrip,
    updateTrip,
    deleteTrip,
};