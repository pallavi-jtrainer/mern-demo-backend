const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async(req, res, next) => {
    // allow CORS pre-flight requests
    if(req.method === "OPTIONS"){
        return next();
    }

    let token;

    if(
        req.headers.authorization && 
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if(!token) {
        return res.status(401).json({message: 'Not Authorized'});
    }

    try {
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(verifiedToken.id).select("-password");

        if(!user){
            return res.status(401).json({message: 'User not Found'});
        }
        // console.log("User: ", req.user);

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({message: 'Invalid or Expired Token'});
    }
}