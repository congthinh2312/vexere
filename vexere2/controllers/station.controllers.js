const {Op} = require("sequelize");//50 search gần giống
const {Station} = require("../models");//13

const createStation = async (req, res) => {
    const {name, address, province} = req.body;//15
    try {
        const newStation = await Station.create({name, address, province});//16
        res.status(201).send(newStation);//17
    } catch (error) {
        res.status(500).send(error);
    }
};//14

const getAllStation = async (req, res) => {
    const {name} = req.query;
    try {
        if (name) {
            const stationList = await Station.findAll({
                where: {
                    name: {
                        [Op.like]: `%${name}%`,//51 search gần giống
                    },
                },
            });
            res.status(200).send(stationList);
        } else {
            const stationList = await Station.findAll();
            res.status(200).send(stationList);
        }//49
    } catch (error) {
        res.status(500).send(error);
    }//32
};//31

const getDetailStation = async (req, res) => {
    const {id} = req.params;
    try {
        const detailStation = await Station.findOne({
            where: {
                id,
            },
        });
        res.status(200).send(detailStation);
    } catch (error) {
        res.status(500).send(error);
    }
};//35

const updateStation = async (req, res) => {
    const {id} = req.params;//39
    const {name, address, province} = req.body;//40
    try {
        const detailStation = await Station.findOne({
            where: {
                id,
            },
        }) ;
        detailStation.name = name;
        detailStation.address = address;
        detailStation.province = province;
        await detailStation.save();//41
        res.status(200).send(detailStation);
    } catch (error) {
        res.status(500).send(error);
    }
};//38

const deleteStation = async (req, res) => {
    const {id} = req.params;//45
    try {
        await Station.destroy({
            where: {
                id,
            },
        });//46
        res.status(200).send("xóa thành công");
    } catch (error) {
        res.status(500).send(error);
    }
};//44

module.exports = {
    createStation,//18
    getAllStation,//33
    getDetailStation,//36
    updateStation,//42
    deleteStation,//47
};