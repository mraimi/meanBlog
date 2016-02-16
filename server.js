var connect = require('connect');
var app = connect();


var logger = function(req, res, next) {
    console.log(req.method, req.url);

    next();
};

// Handles request and response
var helloWorld = function(req, res, next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end("Hello World");
};

app.use(logger);
app.use(helloWorld);
// Register middleware with Connect application

app.listen(3000);

console.log('Server running at http://localhost:3000/');