const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    images:[{
        url: String,
        filename: String
    }],
    postedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Post",postSchema);