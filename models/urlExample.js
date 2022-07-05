// const { model } = require('mongoose')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
    long_url: {
        type: String
    },
    short_ul: {
        type: String
    }
})

module.exports = mongoose.model('shortURL', urlSchema)