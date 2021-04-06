const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User, validate} = require('../models/user');
const express = require('express');
const { JsonWebTokenError } = require('jsonwebtoken');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

// router.get('/', async (req, res) => {
//     const users = await User.find();
//     res.send(users);
// });

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({ email: req.body.email});
    if(user){
        return res.status(400).send('User already exists');
    }
    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const sail = await bcrypt.genSalt(10);
    user.password = await bcrypt.hashSync(req.body.password, sail);
    await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;