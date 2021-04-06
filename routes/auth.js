const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const Joi = require('joi');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({ email: req.body.email });
    if(!user){
        return res.status(400).send('Email or password not valid');
    }
    const validatePassword = await bcrypt.compare(req.body.password, user.password);
    if(!validatePassword){
        return res.status(400).send('Email or password not valid');
    }
    const token = user.generateAuthToken();
    res.send(token);
});

function validate(req){
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(6)
    })
    return schema.validate(req);
}

module.exports = router;