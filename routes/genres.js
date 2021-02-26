const express = require('express');
const Joi = require('joi');
const router = express.Router();

const genres = [
    {id: 1, label: 'HORROR'},
    {id: 2, label: 'ACTION'},
    {id: 3, label: 'SIENCE FICTION'},
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
    const selectedGenre = genres.find(e => e.id == parseInt(req.params.id));
    if(!selectedGenre){
        res.status(404).send('Genre not found');
    }
    res.status(200).send(selectedGenre);
});

router.post('/', (req, res) => {
    const schema = Joi.object({
        label: Joi.string().min(3).required(),
    });
    const result = schema.validate(req.body);
    if(result.error) {
        res.status(400).send(result.error.details[0]);
        return;
    }
    const addedGenre = {
        id: genres.length + 1,
        label: req.body.label
    };
    genres.push(addedGenre);
    res.status(200).send("Added...");
});

router.put('/:id', (req, res) => {
    const editedGenre = genres.find(e => e.id === parseInt(req.params.id));
    if(!editedGenre){
        res.status(404).send("Genre not found...");
    }
    const schema = Joi.object({
        label: Joi.string().min(3).required(),
    });
    const result = schema.validate(req.body);
    if(result.error) {
        res.status(400).send(result.error.details[0]);
        return;
    }
    const index = genres.indexOf(editedGenre);
    genres[index].label = req.body.label;
    res.status(200).send("updated...");
});

module.exports = router;