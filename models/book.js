const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookShema = new Schema({
    title: String,
    author: String,
    pages: Number,
    genre: String,
    published: { type: Boolean, default: false },
    userId: { type: Schema.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Book', bookSchema);