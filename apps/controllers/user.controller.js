
const db = require('../models')
const users = db.users
const Op = db.Sequelize.Op
const bcrypt = require('bcryptjs')
const fs = require('fs')
const crypto = require('crypto')
require('dotenv').config()


exports.list = async (req, res) => {
    try {
        const result = await users.findAll({
            where: {
                deleted: { [Op.eq]: 0 },
                ...req.query.search && {
                    [Op.or]: [
                        { fullname: { [Op.like]: `%${req.query.search}%` } },
                    ]
                },
                ...req.query.role && { role: { [Op.eq]: req.query.role } }
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
        const result = await users.findOne({
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
    if (!req.body.fullname || !req.body.email || !req.body.division || !req.body.password ||
        !req.body.role || !req.body.username || !req.body.gender) {
        return res.status(400).send({ message: "Parameter tidak lengkap" })
    }

    const emailExist = await users.findOne({
        where: {
            deleted: { [Op.eq]: 0 },
            ...req.body.email && { email: { [Op.eq]: req.body.email } }
        }
    })
    if (emailExist) {
        return res.status(404).send({ message: "Email telah terdaftar" })
    }

    const usernameExist = await users.findOne({
        where: {
            deleted: { [Op.eq]: 0 },
            ...req.body.username && { username: { [Op.eq]: req.body.username } }
        }
    })
    if (usernameExist) {
        return res.status(404).send({ message: "Username telah terdaftar" })
    }

    const payload = {
        fullname: req.body.fullname,
        email: req.body.email,
        division: req.body.division,
        gender: req.body.gender,
        username: req.body.username,
        status: req.body.status,
        password: bcrypt.hashSync(req.body.password, 8),
        // photo: `data:image/png;base64,${req.body.photo}` || null,
        role: req.body.role,
    }

    try {
        const result = await users.create(payload)
        return res.status(200).send(result)
    } catch (error) {
        return res.status(500).send({ message: "Server mengalami gangguan!", error })
    }
}

exports.login = async (req, res) => {
    try {
        const existUsers = await users.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                email: { [Op.eq]: req.body.email }
            }
        })
        if (!existUsers) {
            return res.status(404).send({ message: "Email tidak ditemukan!" })
        }
        const comparePassword = await bcrypt.compare(req.body.password, existUsers.password)
        if (!comparePassword) {
            return res.status(404).send({ message: "Password Salah" })
        }
        res.status(200).send({ message: "Berhasil login", result: existUsers })
        return
    } catch (error) {
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}

exports.update = async (req, res) => {
    try {
        const result = await users.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        if (!result) {
            return res.status(404).send({ message: "Data tidak ditemukan!" })
        }
        const onUpdate = await users.update(req.body, {
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        const results = await users.findOne({
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

exports.delete = async (req, res) => {
    try {
        const result = await users.findOne({
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
        res.status(200).send({ message: "Berhasil hapus data"})
        return
    } catch (error) {
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}

exports.change_password = async (req, res) => {
    try {
        const result = await users.findOne({
            where: {
                deleted: { [Op.eq]: 0 },
                id: { [Op.eq]: req.body.id }
            }
        })
        if (!result) {
            return res.status(404).send({ message: "Data tidak ditemukan!" })
        }
        result.password = bcrypt.hashSync(req.body.password, 8)
        await result.save()
        res.status(200).send({ message: "Berhasil ubah password", result: result })
        return
    } catch (error) {
        return res.status(500).send({ message: "Gagal mendapatkan data admin", error: error })
    }
}