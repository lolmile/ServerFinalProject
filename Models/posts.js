const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    _id: {
        type: Number,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    taxonomies: {
        type: [Object],
        require: false
    },
    permaLink: {
        type: String,
        require: true
    },
    eventURL: {
        type: [String],
        require: false
    },
    startDate: {
        type: Date,
        require: true
    },
    endDate: {
        type: Date,
        require: true
    }
})

module.exports = mongoose.model('Posts', postSchema)