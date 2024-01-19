const redis = require('redis');
const client = redis.createClient({
    url: 'redis://redis:6379'
});

client.on('error', err => console.log('Redis Client Error', err)).connect();

exports.cacheUsers = async (req, res, next) => {
    try {
        key = 'user';
        if (req.params.id) {
            key = key + `_${req.params.id}`;
        }
        if (req.params.accountNumber) {
            key = key + `_${req.params.accountNumber}`;
        }
        if (req.params.identityNumber) {
            key = key + `_${req.params.identityNumber}`;
        }
        const data = await client.get(key);
        if (data !== null) {
            res.status(200).json({
                message: "Get users successfully",
                data: JSON.parse(data)
            });
        } else {
            next();
        }
    } catch (error) {
        throw error;
    }
}