const router = require("express").Router();
const { Data, validate } = require("../models/data");
require('dotenv').config();
const mongoose = require("mongoose");

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        const existingData = await Data.findOne({ email: req.body.email });
       
        if (existingData) return res.status(409).send({ message: "User with given email already exists!" });

        await new Data(req.body).save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});


router.get("/", async (req, res) => {
    try {
        const data = await Data.find();
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});



router.get("/:id", async (req, res) => {
    try {
        console.log(req.params)
     
        const { id } = req.params;

     

        const user = await Data.findOne({email: id }); 


        if (!user) return res.status(404).send({ message: "User not found" });

        res.status(200).send(user);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});




module.exports = router;
