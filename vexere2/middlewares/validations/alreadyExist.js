const alreadyExist = (Model) => async (req, res, next) => {
    const {email} = req.body;
    const model = await Model.findOne({
        where: {
            email,
        },
    });
    if (model) {
        res.status(404).send(`${email} Đã tồn tại`);
    } else {
        return next();
    }
};

module.exports = {
    alreadyExist,
};