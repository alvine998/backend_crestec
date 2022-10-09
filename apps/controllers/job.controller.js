
const db = require('../models')
const jobs = db.jobs
const notifications = db.notifications
const Op = db.Sequelize.Op
require('dotenv').config()


exports.list = async (req, res) => {
    try {
        const result = await jobs.findAll({
            where: {
                deleted: { [Op.eq]: 0 },
                ...req.query.search && {
                    [Op.or]: [
                        { detail: { [Op.like]: `%${req.query.search}%` } },
                    ]
                },
                ...req.query.dept && { dept: { [Op.eq]: req.query.dept } },
                ...req.query.subject && { subject: { [Op.eq]: req.query.subject } },
                ...req.query.user_id && { user_id: { [Op.eq]: req.query.user_id } },
                ...req.query.status && { status: { [Op.eq]: req.query.status } },
                ...req.query.start_date && req.query.end_date && {created_on: {[Op.between]: [new Date(req.query.start_date).toISOString(), new Date(req.query.end_date).toISOString()]}}
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
        const result = await jobs.findOne({
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
        user_id: req.body.user_id,
        req_by: req.body.req_by,
        dept: req.body.dept,
        subject: req.body.subject,
        detail: req.body.subject == 'Masalah Lainnya' ? 'Masalah Lainnya' : req.body.subject == 'Preventif' ? 'Preventif' : req.body.detail,
        notes: req.body.notes,
        work_by: req.body.work_by || null,
        approved_by: req.body.approved_by || null
    }
    try {
        const result = await jobs.create(payload)
        if (result) {
            const notifPayload = {
                user_id: req.body.user_id,
                job_id: result.id,
                content: `Job request mu sedang diajukan, Job ID mu adalah ${result.id} mohon menunggu untuk proses pengajuannya. Terima kasih.`
            }
            const resultNotif = await notifications.create(notifPayload)
        }
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send({ message: "Server mengalami gangguan!", error })
    }
}


exports.update = async (req, res) => {
    try {
        const result = await jobs.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        if (!result) {
            return res.status(404).send({ message: "Data tidak ditemukan!" })
        }
        const onUpdate = await jobs.update(req.body, {
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        const results = await jobs.findOne({
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
        const result = await jobs.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.query.id }
            }
        })
        if (!result) {
            return res.status(404).send({ message: "Data tidak ditemukan!" })
        }
        result.result = req.body.result
        result.work_by = req.body.work_by
        result.approved_by = req.body.approved_by
        result.notes = req.body.notes
        result.status = req.body.status
        result.modified_on = req.body.modified_on
        const resultSuccess = await result.save()
        if (resultSuccess) {
            if (req.body.status == 3) {
                const notifPayload = {
                    user_id: result.user_id,
                    job_id: result.id,
                    content: `Job request ${result.id} sudah selesai. Terima kasih.`,
                    status: 3
                }
                const resultNotif = await notifications.create(notifPayload)
            }
        }

        const results = await jobs.findOne({
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
        const result = await jobs.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.query.id }
            }
        })
        if (!result) {
            return res.status(404).send({ message: "Data tidak ditemukan!" })
        }
        result.status = req.body.status
        result.modified_on = req.body.modified_on
        result.notes = req.body.notes || result.notes
        result.approved_by = 'EDP Manager'
        const resultApproval = await result.save()
        if (resultApproval) {
            if (req.body.status == 1) {
                const notifPayload = {
                    user_id: result.user_id,
                    job_id: result.id,
                    content: `Job request ${result.id} sudah disetujui, Mohon menunggu hingga proses selesai. Terima kasih.`,
                    status: 1
                }
                const resultNotif = await notifications.create(notifPayload)
            } else if (req.body.status == 2) {
                const notifPayload = {
                    user_id: result.user_id,
                    job_id: result.id,
                    content: `Job request ${result.id} tidak dapat kami setujui karena ${req.body.notes}. Terima kasih.`,
                    status: 2
                }
                const resultNotif = await notifications.create(notifPayload)
            }
        }

        const results = await jobs.findOne({
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
        const result = await jobs.findOne({
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