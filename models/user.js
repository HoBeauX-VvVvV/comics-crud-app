const mongoose = require('mongoose');

const comicSchema = new mongoose.Schema({
    title: { type: String, required: true},
    issue: { type: Number, required: true },
    author: { type: String, required: true },
    artist: { type: String, required: true },
    publisher: String,
    year: Number
});

const Comic = mongoose.model('Comic', comicSchema);

module.exports = Comic;

const userSchema = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    comicsCollection: [ comicSchema ]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
