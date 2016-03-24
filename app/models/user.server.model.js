var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var UserSchema = new Schema({
    firstName : String,
    lastName : String,
    username: {
        type: String,
        required: 'Username is required',
        trim: true,
        unique: true
    },
    email: {
        type: String,
        match: [/.+@.+\..+/, " Please choose a valid email address"]
    },
    password: {
        type: String,
        validate: [
            function(password) {
                return password && password.length > 6;
            }, 'Password must be greater than six characters'
        ]
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerId: String,
    providerData: {},
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

UserSchema.pre('save', function(next){
    if (this.password) {
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password)
    }

    next();
});

UserSchema.methods.hashPassword = function(password){
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password) {
    return this.password === this.hashPassword(password);
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback){
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne({
        username: possibleUsername
    }, function(err, user) {
        if (!err) {
            if (!user){
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });
};


UserSchema.set('toJSON', { getters: true, virtuals:true });

mongoose.model('User',UserSchema);