// role based authorization

exports.authorize = (...allowedRoles) => {
    return (req, res, next) => {
        // console.log("Role: ", req.user.role);
        if(!req.user || !req.user.role) {
            return res.status(401).json({message: 'Not Authorized'});
        }

        if(!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: 'Access Denied: Insufficient Permissions'
            });
        }
        next();
    }
}