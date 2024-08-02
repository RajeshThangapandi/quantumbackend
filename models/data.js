const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const dataSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

dataSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
    return token;
};

const Data = mongoose.model("Data", dataSchema);

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        dateOfBirth: Joi.date().required().label("Date of Birth"),
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().min(6).required().label("Password"),
    });
    return schema.validate(data);
};

module.exports = { Data, validate };
