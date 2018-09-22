const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HistorySchema = new Schema({
    entry: [
        {
            name: [String],
            faces: [String],
            date: Date
        }
    ],
    exit: [
        {
            image: [String],
            date: Date
        }
    ]

});

const History = mongoose.model('History', HistorySchema);
module.exports = History;