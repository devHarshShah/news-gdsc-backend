const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
 username: {
    type: String,
    required: true,
    unique: true
 },
 email: {
    type: String,
    required: true,
    unique: true
 },
 password: {
    type: String,
    required: true
 },
 creationDate: {
    type: Date,
    default: Date.now
 },
 karmaPoints: {
    type: Number,
    default: 0
 },
 submissions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story'
 }],
 comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
 }],
 bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story'
 }]
});

module.exports = mongoose.model('User', userSchema);
