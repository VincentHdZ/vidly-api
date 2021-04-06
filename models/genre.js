const Joi = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const genreSchema = new Schema({
    label:{
        type: String,
        required: true,
        minlenth: 5,
        maxlength: 50
    }
});

function validateGenre(genre){
    const schema = Joi.object({
        label: Joi.string().min(3).required(),
    });
    return schema.validate(genre);
}

const Genre = mongoose.model('Genres', genreSchema);

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;