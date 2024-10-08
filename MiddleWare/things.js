//To separate the routes from our main index.js file, we will use Express.Router

var express =require('express');
var router = express.Router();

router.get('/', function(req,res){
    res.send("GET route on things file")
});

router.post('/', function(req,res){
    res.send("POST route on things files")
});

//export this file to router.js file
module.exports= router;