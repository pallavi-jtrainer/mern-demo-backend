const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (userId) => {
    return jwt.sign(
        {id: userId},
        process.env.JWT_SECRET,
        {expiresIn: '7d'}
    );
}

// Register User
exports.register = async(req, res) => {
    // const user = await User.create(req.body);
     try{
            const exists = await User.exists();
            // showUser();
            let nextId = 1;
            
            if(!exists)
                nextId = 1;
            else {
                const lastUser = await User.find()
                                .sort({_id: -1})
                                .limit(1)
                                .select("_id");
                
                nextId = lastUser ? lastUser[0]._id + 1 : 1;
            }
    
            const user = await User.create({
                _id: nextId, ...req.body
            });
            const token = generateToken(user._id);

            res.status(201).json({
                token, 
                user: {
                    id: user._id,
                    email: user.email,
                    role:user.role
                }
            });
     } catch(error) {
        res.status(400).json({message: error.message});
     }
    
}

// user login
exports.login = async(req, res) => {
    try {

        const {email, password} = req.body;

        const user = await User.findOne({email}).select("+password");
        // console.log(user)
        if(!user || !(await user.comparePassword(password))) {
            return res.status(401).json({message: "Invalid Credentials"});
        }

        const token = generateToken(user._id);

        res.json({
            token,
            user: {
                userId: user._id,
                email: user.email,
                role: user.role
            }
        })
    } catch(error) {
        res.status(500).json({message: 'Login Failed'});
    }
    
}