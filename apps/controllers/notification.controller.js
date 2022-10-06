
const db = require('../models')
const notifications = db.notifications
const Op = db.Sequelize.Op
require('dotenv').config()


exports.list = async (req, res) => {
    try {
        const result = await notifications.findAll({
            where: {
                deleted: { [Op.eq]: 0 },
                ...req.query.search && {
                    [Op.or]: [
                        { detail: { [Op.like]: `%${req.query.search}%` } },
                    ]
                },
                user_id: { [Op.eq]: req.query.user_id }
            },
            order: [
                ['created_on', 'DESC'],
            ],
        })
        if(!result){
            return res.status(404).send({message: "Notifikasi untuk user ini tidak ditemukan!"})
        }
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send({ message: "Server mengalami gangguan!", error })
    }
}