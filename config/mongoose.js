var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function(){
    var db = mongoose.connect(config.db);

    require('../app/models/entry.server.model');
    require('../app/models/user.server.model');
    require('../app/models/article.server.model.js');

    return db;
};

