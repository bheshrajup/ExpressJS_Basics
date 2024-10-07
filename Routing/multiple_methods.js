var express = require('express');
var app = express();

app.get('/hello', function(req, res) { // GET
    res.send("Hello World!");
});

app.post('/hello', function(req, res) { // POST
    res.send("You just called the post method at '/hello'!\n");
});

app.listen(3001, function() {
    console.log("Server running at http://localhost:3001/");
});
