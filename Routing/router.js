var express = require('express');
var app=express();

var things=require('./things.js');

//both router.js and things.js must be in the same directory

app.use('/things', things);

app.listen(3000);