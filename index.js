const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
// const Joi = require('joi');
const app = express();


mongoose.connect('mongodb://localhost:27017/vidly', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true})
    .then(() => console.log('Connected to mongoDB...'))
    .catch(err => console.error.log('Could not connect to MongoDB...'));


app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

app.get('/',(req, res) => {
    res.send('Welcome to Vidly API');
});


app.listen(3000, () => {
    console.log('Listening on port 3000...');
});