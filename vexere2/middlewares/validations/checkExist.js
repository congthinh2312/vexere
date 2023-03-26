// const checkExist = (Model) => {
//     return async (req, res, next) => {
//         const {id} = req.params;
//         const station = await Model.findOne({
//             where: {
//                 id,
//             },
//         });
//         if (station) {
//             next();
//         } else {
//             res.status(404).send(`không tìm thấy id là ${id}`);
//         }
//     };
// };//53

const checkExist = (Model) => async (req, res, next) => {
    const {id} = req.params;
    const model = await Model.findOne({
        where: {
            id,
        },
    });
    if (model) {
        next();
    } else {
        res.status(404).send(`không tìm thấy id là ${id}`);
    }
};


module.exports = {
    checkExist,//54
};