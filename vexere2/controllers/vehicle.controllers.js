const {Vehicle} = require("../models");

const createVehicle = async (req, res) => {
    const {name, passengerCarCompanies_id} = req.body;
    try {
        const newVehicle = await Vehicle.create({name, passengerCarCompanies_id});
        res.status(201).send(newVehicle);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getAllVehicle = async (req, res) => {
    try {
        const vehicleList = await Vehicle.findAll();
        res.status(200).send(vehicleList);
    } catch (error) {
        res.status(500).send(error);
    }
};

const getDetailVehicle = async (req, res) => {
    const {id} = req.params;
    try {
        const vehicleDetail = await Vehicle.findOne({
            where: {
                id,
            },
        });
        res.status(200).send(vehicleDetail);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateVehicle = async (req, res) => {
    const {id} = req.params;
    const {name, passengerCarCompanies_id} = req.body;
    try {
        const vehicleDetail = await Vehicle.findOne({
            where: {
                id,
            },
        });
        vehicleDetail.name = name;
        vehicleDetail.passengerCarCompanies_id = passengerCarCompanies_id;
        await vehicleDetail.save();
        res.status(200).send(vehicleDetail);
    } catch (error) {
        res.stauts(500).send(error);
    }
};

const deleteVehicle = async (req, res) => {
    const {id} = req.params;
    try {
        await Vehicle.destroy({
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
    createVehicle,
    getAllVehicle,
    getDetailVehicle,
    updateVehicle,
    deleteVehicle
};