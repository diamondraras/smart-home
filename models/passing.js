const mongoose = require('mongoose');

const PassingSchema = mongoose.Schema({
    image: String,
    date: Date
});

const Passing = mongoose.model('Passing', PassingSchema);

module.exports = Passing;