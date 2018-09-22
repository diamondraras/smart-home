const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProfilSchema = new Schema({
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
    pseudo: {
        type: String,
        default: null
    }
});

ProfilSchema.methods.toWeb = function() {
    let json = this.toJSON();
    json._id = this._id; //this is for the front end
    return json;
};

module.exports = ProfilSchema;