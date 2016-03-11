var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName : String,
    lastNAme : String,
    username: {
        type: String,
        trim: true,
        unique: true
    },
    email: String,
    password: String,
    created: {
        type: Date,
        default: Date.now
    },
    website: {
        type: String,
        get: function(url){
            if (!url){
                return url;
            } else {
                if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
                    url = 'http://' +  url;
                }
                return url;
            }
        }
    }
});

UserSchema.statics.findOnebyUsername = function(username, callback) {
    this.findOne({username: new RegExp(username, 'i')}, callback);
};
UserSchema.virtual('fullName').get(function(){
    return this.firstName + ' ' + this.lastName;
});
UserSchema.set('toJSON', { getters: true, virtuals:true });

mongoose.model('User',UserSchema);