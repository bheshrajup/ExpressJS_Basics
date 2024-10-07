//Regex can also be used to restrict URL parameter matching.
//Let's assume id to be a 5-digit long number.

var express = require('express');
var app= express();

app.post('/things/:id[0-9]{5}}', function(req,res){
    res.send('Sorry this is an invalid URL');
});

app.listen(3000);