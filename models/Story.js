const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
 title: {
    type: String,
    required: true
 },
 content: {
    type: String,
    required: true
 },
 imageUrl: {
    type: String,
    required: true
 },
 publishedDate: {
    type: Date,
    default: Date.now
 },
 category: {
    type: String,
    enum: ['top', 'new', 'best'],
    required: true
 },
 comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
 }],
 bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
 }],
 user: {
   type: mongoose.Schema.Types.ObjectId,
   ref: 'User',
   required: true
 }
});

module.exports = mongoose.model('Story', storySchema);
