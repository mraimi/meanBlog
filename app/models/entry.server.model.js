var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EntrySchema = new Schema({
    title: String,
    description: String,
    date: String,
    author: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    body: String,
    tags: String
});

mongoose.model('Entry',EntrySchema);