var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName : String,
    lastNAme : String,
    username: String,
    email: String,
    password: String
});

mongoose.model('User',UserSchema);