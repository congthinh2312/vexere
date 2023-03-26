const {PassengerCarCompanie} = require("../models");

const createCarCompanie = async (req, res) => {
    const {name, image, description, trip_id} = req.body;
    try {
        const newCarCompanie = await PassengerCarCompanie.create({name, image, description, trip_id});
        res.status(201).send(newCarCompanie);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllCarCompanie = async (req, res) => {
    try {
        const carCompanieList = await PassengerCarCompanie.findAll();
        res.status(200).send(carCompanieList);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getDetailCarCompanie = async (req, res) => {
    const {id} = req.params;
    try {
        const detailCarCompanie = await PassengerCarCompanie.findOne({
            where: {
                id,
            },
        });
        res.status(200).send(detailCarCompanie);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateCarCompanie = async (req, res) => {
    const {id} = req.params;
    const {name, image, description, trip_id} = req.body;
    try {
        const detailCarCompanie = await PassengerCarCompanie.findOne({
            where: {
                id,
            },
        });
        detailCarCompanie.name = name;
        detailCarCompanie.image = image;
        detailCarCompanie.description = description;
        detailCarCompanie.trip_id = trip_id;
        await detailCarCompanie.save();
        res.status(200).send(detailCarCompanie);
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteCarCompanie = async (req, res) => {
    const {id} = req.params;
    try {
        await PassengerCarCompanie.destroy({
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
    createCarCompanie,
    getAllCarCompanie,
    getDetailCarCompanie,
    updateCarCompanie,
    deleteCarCompanie,
};