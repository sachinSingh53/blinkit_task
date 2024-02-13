const jwt = require('jsonwebtoken');

const isLoggedIn = (req,res,next)=>{
    
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,'my_secret',(err,decodedToken)=>{
            if(err){
                res.status(400).json({
                    message: 'you must be loggedin first',
                    error: err
                }) 
            } else{
                // console.log(decodedToken);
                next();
            }
        })
    }else{
        res.status(400).json({
            message: 'you must be LoggedIn'
        })
    }
}

module.exports = {isLoggedIn};