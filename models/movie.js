const mongoose = require('mongoose');
const {genreSchema} = require('./genre');
const Joi = require('joi');

const Movie = mongoose.model('Movie', mongoose.Schema({
        title:{
            type: String,
            required: true,
        },
        numberInStock:{
            type: Number,
            default: 0,
        },
        dailyRentalRate:{
            type: Number,
            default: 0,
        },
        genre:{
            type: genreSchema,
            required: true
        }
    })
);

function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().required(),
        numberInStock: Joi.number().default(0),
        dailyRentalRate: Joi.number().default(0),
        genreId: Joi.string().required(),
    });
    return schema.validate(movie);
}

exports.Movie = Movie;
exports.validate = validateMovie;