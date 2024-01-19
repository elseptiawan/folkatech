const jwt = require("jsonwebtoken");

verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.status(401).json({success: 'false', meessage: 'unauthorized'});;
    jwt.verify(token, process.env.API_SECRET, (err, decoded) => {
        if(err) return res.sendStatus(403);
        next();
    });
}

module.exports = verifyToken;