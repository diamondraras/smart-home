const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfilSchema = new Schema({
    checked: {
        type: Boolean,
        default: false
    },
    playpoint: {
        type: Number,
        default: 0
    },
    photoUrl: {
        type: String,
        default: null
    },
    name: {
        type: String,
        default: null
    },
    firstName: {
        type: String,
        default: null
    },
    sex: {
        type: String,
        default: null
    },
    age: {
        type: Number,
        default: null
    },
    country: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    state: {
        type: String,
        default: null
    },
    streetName: {
        type: String,
        default: null
    },
    zipCode: {
        type: String,
        default: null
    },
    phoneNumber: {
        type: String,
        default: null
    },
    pseudo: {
        type: String,
        default: null
    },
    accountType: {
        type: String,
        default: null
    },
    company: {
        type: String,
        default: null
    },
    acceptCookie: {
        type: Boolean,
        default: false
    },
    acceptRGPD: {
        type: Boolean,
        default: false
    },
    acceptGeneralAgreement: {
        type: Boolean,
        default: false
    },
    language: {
        type: String,
        default: "Anglais"
    }
});

ProfilSchema.methods.toWeb = function() {
    let json = this.toJSON();
    json._id = this._id; //this is for the front end
    return json;
};

module.exports = ProfilSchema;