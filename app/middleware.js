let jwt = require('jsonwebtoken');
const key = require('./key.js');

let checkToken = (req,res,next) => {
    let authHeader = req.headers['x-access-token'] || req.headers['authorization'];
    if(authHeader){
        // token = token.slice(7,token.length);
        token = authHeader.split(' ')[1];
        try {
            result = jwt.verify(token, key.secret, {expiresIn: '1d', issuer: 'https://safelybuy.com'});
            req.decoded = result
            next()
        } catch (error) {
            throw new Error(error);
        }
    }else{
        res.status(401).send({error:'Authentication Error, token required'});
    }
}
module.exports = {
    checkToken: checkToken
}