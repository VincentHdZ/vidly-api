const auth = require('../middleware/auth');
const {Customer, validate} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if(!customer){
        res.status(404).send(`Customer with id "${req.params.id} not found"`);
    }
    res.send(customer);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    const customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });
    await customer.save();
    res.status(200).send(`user "${customer.id}" created...`);
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    const customer = await Customer.findByIdAndUpdate(req.params.id,
      { 
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
      }, { new: true });
  
    if (!customer) {
        return res.status(404).send('The customer with the given ID was not found.');
    }
    res.status(200).send(`customer "${req.params.id}" updated...`);
});

router.delete('/:id', auth, async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
  
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
    res.status(200).send(`customer "${req.params.id}" deleted...`);
  });

module.exports = router;
