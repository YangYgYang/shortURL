// const { model } = require('mongoose')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
    long_url: {
        type: String
    },
    short_url: {
        type: String,
        unique: true
    }
})

module.exports = mongoose.model('short_url', urlSchema)