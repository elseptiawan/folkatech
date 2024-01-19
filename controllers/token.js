const jwt = require('jsonwebtoken');

exports.generateToken = async (req, res) => {
    try {
        const token = jwt.sign({}, process.env.API_SECRET, {
            expiresIn: '1h'
        });
        res.status(200).json({
            message: "Generate token successfully",
            token: token
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}