const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
 content: {
    type: String,
    required: true
 },
 publishedDate: {
    type: Date,
    default: Date.now
 },
 story: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Story',
    required: true
 },
 user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
 }
});

module.exports = mongoose.model('Comment', commentSchema);
