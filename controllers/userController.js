const User = require('../model/users');
const jwt = require('jsonwebtoken');

const maxAge = 3*24*60*60;
// here id is a payload 
const createToken = (id) => {
    return jwt.sign({ id },'my_secret',{
        expiresIn: maxAge
    });
} 


module.exports.signup = async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.create({email,password});
        const token = createToken(user._id);
        //the httpOnly is used so that the cookie can only be modify by http requests
        res.cookie('jwt',token,{ httpOnly: true,maxAge:maxAge*1000});
        res.status(200).json({user:user._id});

    }catch(err){
        res.status(400).json({
            message:'fail',
            error:err.message
        })
    }
}

module.exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        //i have defined a static method login in user schema
        const user = await User.login(email, password);
        const token = createToken(user._id);


        //setting the cookie in browser
        res.cookie('jwt',token,{ httpOnly: true,maxAge:maxAge*1000});
        res.status(200).json({user:user._id});
    }catch(err){
        res.status(400).json({
            message:'fail',
            error:err.message
        })
    }
}

module.exports.logout = (req,res)=>{
    //here we are overwriting the existing jwt cookie with empty string and and expriring it in 1ms so after 1ms the jwt cookie will be removed
    try{
        res.cookie('jwt','',{maxAge:1});
        res.status(200).json({
            message:'goodbye'
        })
    }
    catch(err){
        res.status(400).json({
            message:'fail',
            error:err.message
        })
    }
    
}