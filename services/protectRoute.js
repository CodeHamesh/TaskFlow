const jwt = require('jsonwebtoken');
require('dotenv').config()
function protectRoute(req, res, next) {
    const token = req.cookies.token ;
    if (!token) {
        return res.redirect('/user/login');
    }
    try {
        const decoded = jwt.verify(token,process.env.JWT); 
        req.user = decoded;
        next(); 
    } catch (err) {
        next(err)
    }
}

module.exports = protectRoute;
