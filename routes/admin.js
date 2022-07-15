const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const express = require('express')
const router = new express.Router()
const Admin = require('../models/admin')
const auth = require('../middleware/auth')

router.post('/admin/signup', async (req, res) => {
    try {
        var admin = new Doctor(req.body)
        const token = await admin.generateAuthToken()
        const saved_Admin = await admin.save()

        res.status(201).json({token,'Name':saved_Admin.name})
    }
    catch (e) {
        res.status(404).json(e)
    }

})

router.post('/admin/login', async (req, res) => {
    try {
        const password = req.body.password
        const email = req.body.email

        //console.log(password,registrationNumber)

        const admin = await Admin.findOne({ email })
        if (!admin)
            res.status(400).json({ "Error": "No Such User Found" })
        else {
            const isPasswordValid = await bcrypt.compare(password, admin.password)
            //console.log(isPasswordValid)

            if (isPasswordValid) {
                ///console.log(doctor.tokens)
                const token = await admin.generateAuthToken()
                const saved_Admin = await doctor.save()
                //console.log(saved_Doctor)

                res.status(200).json({ token, 'Name': saved_Admin.name})
            }
            else {
                res.status(400).json({ "Error": 'Incorrect Credentials' })
            }

        }
    }
    catch (e) {
        res.status(400).json(e)
    }


})

router.get('/admin/logout', auth, async (req, res) => {
    try {

        const name = req.name

        const admin = await Admin.findOne({ name })
        if (!admin)
            res.status(404).json({ "Error": "Admin not found" })
        else {

            admin.tokens = []
            await Admin.save()

            res.status(200).json({ "Message": "Logged Out succesfully!!" })

        }
    }
    catch (e) {
        res.status(404).json(e)
    }
})

router.get('/doctor/:rno', auth, async (req, res) => {
    try {
        const regNo = req.params.rno

        const doctor = await Doctor.findOne({ registrationNumber: regNo })
        if (!doctor)
            res.status(404).json({ "Error": "Invalid Credentials" })
        else {
            res.status(200).json({
                'name': doctor.name,
                'registrationNumber': doctor.registrationNumber,
                'address': doctor.address,
                'dob': doctor.dob,
                'email': doctor.email,
                'number': doctor.phoneNumber,
                'college': doctor.college
            })

        }
    }
    catch (e) {
        res.status(404).json(e)
    }


})


module.exports = router