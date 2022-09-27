
const db = require('../models')
const helpdesks = db.helpdesks
const Op = db.Sequelize.Op
require('dotenv').config()


exports.list = async (req, res) => {
    try {
        const result = await helpdesks.findAll({
            where: {
                deleted: { [Op.eq]: 0 },
                ...req.query.search && {
                    [Op.or]: [
                        { title: { [Op.like]: `%${req.query.search}%` } },
                    ]
                },
                ...req.query.dept && { dept: { [Op.eq]: req.query.dept } },
                ...req.query.subject && { subject: { [Op.eq]: req.query.subject } },
                ...req.query.user_id && { user_id: { [Op.eq]: req.query.user_id } },
                ...req.query.status && { status: { [Op.eq]: req.query.status } }
            },
            order: [
                ['created_on', 'DESC'],
            ],
        })
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send({ message: "Server mengalami gangguan!", error })
    }
}

exports.single = async (req, res) => {
    try {
        const result = await helpdesks.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.query.id },
                ...req.query.email && { email: { [Op.eq]: req.query.email } }
            }
        })
        if (!result) {
            return res.status(404).send({ message: "User tidak ditemukan" })
        }
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send({ message: "Server mengalami gangguan!", error })
    }
}

exports.create = async (req, res) => {
    const payload = {
        created_by: req.body.created_by,
        title: req.body.title,
        slug: req.body.slug,
        category: req.body.category,
        body: req.body.body,
    }
    try {
        const result = await helpdesks.create(payload)
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send({ message: "Server mengalami gangguan!", error })
    }
}


exports.update = async (req, res) => {
    try {
        const result = await helpdesks.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        if (!result) {
            return res.status(404).send({ message: "Data tidak ditemukan!" })
        }
        const onUpdate = await helpdesks.update(req.body, {
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        const results = await helpdesks.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        res.status(200).send({ message: "Berhasil ubah data", result: results, update: onUpdate })
        return
    } catch (error) {
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}

exports.update_final = async (req, res) => {
    try {
        const result = await helpdesks.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.query.id }
            }
        })
        if (!result) {
            return res.status(404).send({ message: "Data tidak ditemukan!" })
        }
        result.work_by = req.body.work_by
        result.notes = req.body.notes
        result.status = req.body.status
        await result.save()

        const results = await helpdesks.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.query.id }
            }   
        })
        res.status(200).send({ message: "Berhasil ubah data", result: results })
        return
    } catch (error) {
        return res.status(500).send({ message: "Gagal mendapatkan data job", error: error })
    }
}

exports.update_status = async (req, res) => {
    try {
        const result = await helpdesks.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.query.id }
            }
        })
        if (!result) {
            return res.status(404).send({ message: "Data tidak ditemukan!" })
        }
        result.status = req.body.status
        result.approved_by = 'EDP Manager'
        await result.save()

        const results = await helpdesks.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.query.id }
            }
        })
        res.status(200).send({ message: "Berhasil ubah data", result: results })
        return
    } catch (error) {
        return res.status(500).send({ message: "Gagal mendapatkan data job", error: error })
    }
}

exports.delete = async (req, res) => {
    try {
        const result = await helpdesks.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.query.id }
            }
        })
        if (!result) {
            return res.status(404).send({ message: "Data tidak ditemukan!" })
        }
        result.deleted = 1
        await result.save()
        res.status(200).send({ message: "Berhasil hapus data" })
        return
    } catch (error) {
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}