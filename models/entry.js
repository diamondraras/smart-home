const mongoose = require('mongoose');

const EntrySchema = mongoose.Schema({
    persons: {
        name: String,
        string_img: String
    },
    date: Date
});

const Entry = mongoose.model('Entry', EntrySchema);

module.exports = Entry;

