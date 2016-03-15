var User = require('mongoose').model('User');

exports.list = function(req,res,next){
    User.find({}, function(err, users){
        if (err){
            return next(err);
        } else {
            res.json(users);
        }
    });
};

exports.create = function(req,res,next){
    var user = new User(req.body);

    user.save(function(err){
        if (err){
            return next(err);
        } else {
            res.json(user);
        }
    });
};

exports.read = function(req,res){
    res.json(req.user);
};

exports.userById = function(req,res,next,id){
    User.findOne({
        _id: id
    }, function(err, user){
        if (err) {
            return next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

exports.update = function(req,res,next){
    User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
        if (err){
            return next(err);
        } else {
            res.json(user);
        }
    });
};

exports.delete = function(req,res,next){
    req.user.delete(function(err){
        if(err){
            return next(err);
        } else {
            res.json(user);
        }
    });
};