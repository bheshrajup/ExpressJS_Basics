const jwt = require('jsonwebtoken');

const generateToken =(payLoad)=>{
    const secretKey = 'achinaru123';
    const option={
        expiresIn : '1h',
    };

    const token =jwt.sign(payLoad, secretKey, option); //generate new JWT token
    return token;
};

module.exports={
    generateToken,
};