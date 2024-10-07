var express = require('express');
var app = express();

app.all('/test', function(req, res){
   res.send("HTTP method doesn't have any effect on this route..");
});

app.listen(3000);