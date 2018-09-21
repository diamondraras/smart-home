const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let SessionSchema = mongoose.Schema({
    refreshToken: {
        type: String,
        unique: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
})

let Session = module.exports = mongoose.model('Session', SessionSchema);