var connect = require('connect');
var app = connect();

// Handles request and response
var helloWorld = function(req,res,next) {
    res.setHeader('Content-Type', 'text/plain');
    res.end("Hello World");
};

// Register middleware with Connect application
app.use(helloWorld);

app.listen(3000);
console.log('Server running at http://localhost:3000/');