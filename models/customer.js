const Joi = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const customersSchema = new Schema({
    isGold:{
        type: Boolean,
        default: false,
    },
    name:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    }
});

function validateCustomer(customer){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.bool().default(false)
    });
    return schema.validate(customer);
}

const Customer = mongoose.model('Customers', customersSchema);

exports.Customer = Customer;
exports.validate = validateCustomer;