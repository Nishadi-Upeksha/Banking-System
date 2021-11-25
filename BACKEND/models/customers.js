const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customSchema = new Schema({
    id : {
        type : String,
        required: true
    },
    fName : {
        type : String,
        required: true
    },
    lName : {
        type : String,
        required: true
    },
    idNumber : {
        type : String,
        required: true
    },
    accBalance : {
        type : String,
        required: true
    },
    address : {
        type : String,
        required: true
    },
    phoneNo : {
        type : Number,
        required: true
    }
})

const Customer = mongoose.model("Customer Information", customSchema);

module.exports = Customer;