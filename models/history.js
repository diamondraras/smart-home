const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HistorySchema = new Schema({
    entry: [
        {
            names: [String],
            faces: [String],
            date: Date
        }
    ],
    exit: [
        {
            images: [String],
            date: Date
        }
    ]

});

const History = mongoose.model('History', HistorySchema);
module.exports = History;