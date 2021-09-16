const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 4,
      maxlength: 50
    },
    isGold: {
        type: Boolean,
        default: false
    },
    phone: {
        type: Number,
        required: true,
        minlength:10,
        maxlength:10
    }
  }));

function validateCustomer(customer){
const schema = Joi.object({
    name: Joi.string().min(4).max(50).required(),
    isGold: Joi.boolean(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required()
});
return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer;