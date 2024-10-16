//Load environment from .env
require('dotenv').config();

const express = require('express');
const app = express();

//Use the port from .env
const PORT = process.env.PORT||3000;

//simple routing
app.get('/',(req,res)=>{
    res.send('Hello! Database password is hidden for security..');
});

app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});