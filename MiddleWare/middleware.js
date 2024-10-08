// var express =require('express');
// var app=express();

// //Simple request time logger
// app.use(function(req, res, next){
//     console.log("A new request received at "+ Date.now());

//     //This function call is very important. It tells that more processing is required for the current request and is in the next middleware.

//     // function route handler.
//     next();
// });

// app.listen(3000);

var express = require('express');
var app = express();

app.use('/things',function(req,res,next){
    console.log("A request for things received at "+ Date.now());
    next();
});

//Route handler that sends the response 
app.get('/things', function(req,res){
    res.send('Things..');
});

app.listen(3000);