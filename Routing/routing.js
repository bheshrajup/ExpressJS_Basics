var express = require('express');
var app = express();

app.get('/hello', function(req, res){ //http://localhost:3000/hello
   res.send("Hello World!");
});

app.listen(3000);