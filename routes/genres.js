const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const {Genre, validate} = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const genres = await Genre.find();
    res.send(genres);
});

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
        return res.status(404).send('The genre with the given ID was not found.');
    }
    res.send(genre);
});

router.post('/', auth, async (req, res) => {
    const { error } = validate(req.body);
    if(error) {
        return res.status(400).send(error.details[0].message);
    }
    const genre = new Genre({ label: req.body.label });
    await genre.save();
    res.status(200).send(`genre ${genre.label} added`);
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(req.params.id, { label: req.body.label }, {
      new: true
    });
    if (!genre) {return res.status(404).send('The genre with the given ID was not found.');
    }
    res.status(200).send(`genre ${genre.label} updated`);
});

router.delete('/:id', [auth, admin], async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre){
        return res.status(404).send('The genre with the given ID was not found.');
    }
    res.send(genre);
  });

module.exports = router;