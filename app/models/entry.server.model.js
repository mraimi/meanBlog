var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EntrySchema = new Schema({
    title: String,
    description: String,
    date: String,
    author: String,
    body: String,
    tags: String
});

mongoose.model('Entry',EntrySchema);