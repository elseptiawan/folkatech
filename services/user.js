const User = require('../repository/user');
const redis = require('redis');
const { param, use } = require('../routes/users');
const client = redis.createClient({
    url: 'redis://redis:6379'
});

client.on('error', err => console.log('Redis Client Error', err)).connect();

exports.createUser = async (body) => {
    try {
        const params = {
            userName: body.userName,
            accountNumber: body.accountNumber,
            emailAddress: body.emailAddress,
            identityNumber: body.identityNumber
        }
        const checkUser = await User.checkUserExist(params);
        if (checkUser !== null) {
            return null;
        }
        const user = await User.createUser(body);
        const redisData = await client.get('user');
        if (redisData !== null) {
            const data = JSON.parse(redisData);
            rs = {
                id: user._id,
                userName: user.userName,
                accountNumber: user.accountNumber,
                emailAddress: user.emailAddress,
                identityNumber: user.identityNumber,
                createdAt: user.createdAt.toLocaleDateString('en-UK'),
                updatedAt: user.updatedAt.toLocaleDateString('en-UK')
            }
            data.push(rs);
            await client.setEx('user', '600', JSON.stringify(data));
        }
        return user;
    } catch (error) {
        throw error;
    }
}

exports.getAllUsers = async () => {
    try {
        const users = await User.getUsers({});
        rs = users.map((user) => {
            return {
                id: user._id,
                userName: user.userName,
                accountNumber: user.accountNumber,
                emailAddress: user.emailAddress,
                identityNumber: user.identityNumber,
                createdAt: user.createdAt.toLocaleDateString('en-UK'),
                updatedAt: user.updatedAt.toLocaleDateString('en-UK')
            }
        });
        await client.setEx('user', '600', JSON.stringify(rs));
        return rs;
    } catch (error) {
        throw error;
    }
}

exports.getUserById = async (id) => {
    try {
        const user = await User.getUser({_id: id});
        if (!user) {
            return null;
        }
        rs = {
            id: user._id,
            userName: user.userName,
            accountNumber: user.accountNumber,
            emailAddress: user.emailAddress,
            identityNumber: user.identityNumber,
            createdAt: user.createdAt.toLocaleDateString('en-UK'),
            updatedAt: user.updatedAt.toLocaleDateString('en-UK')
        }
        await client.setEx(`user_${id}`, '600', JSON.stringify(rs));
        return rs;
    } catch (error) {
        throw error;
    }
}

exports.updateUser = async (id, body) => {
    try {
        const user = await User.getUser({_id: id});
        if (!user) {
            return null;
        }
        const checkUser = await User.checkUserExist(body);
        if (checkUser !== null) {
            throw new Error('UserName or AccountNumber or Email or IdentityNumber already exists');
        }
        const update = await User.updateUser(id, body);
        const redisData = await client.get('user');
        if (redisData !== null) {
            const data = JSON.parse(redisData);
            const index = data.findIndex((user) => user._id === id);
            data[index] = {...data[index], ...body};
            await client.setEx('user', '600', JSON.stringify(data));
        }
        return update;
    } catch (error) {
        throw error;
    }
}

exports.deleteUser = async (id) => {
    try {
        const user = await User.getUser({_id: id});
        if (!user) {
            return null;
        }
        await User.deleteUser(id);
        const redisData = await client.get('user');
        if (redisData !== null) {
            const data = JSON.parse(redisData);
            const newData = data.filter((v) => v.id !== id);
            await client.setEx('user', '600', JSON.stringify(newData));
        }
        return user;
    } catch (error) {
        throw error;
    }
}

exports.getUserByAccountNumber = async (accountNumber) => {
    try {
        const user = await User.getUser({accountNumber: accountNumber});
        rs = {
            id: user._id,
            userName: user.userName,
            accountNumber: user.accountNumber,
            emailAddress: user.emailAddress,
            identityNumber: user.identityNumber,
            createdAt: user.createdAt.toLocaleDateString('en-UK'),
            updatedAt: user.updatedAt.toLocaleDateString('en-UK')
        }
        await client.setEx(`user_${accountNumber}`, '600', JSON.stringify(rs));
        return rs;
    } catch (error) {
        throw error;
    }
}

exports.getUserByIdentityNumber = async (identityNumber) => {
    try {
        const user = await User.getUser({identityNumber: identityNumber});
        rs = {
            id: user._id,
            userName: user.userName,
            accountNumber: user.accountNumber,
            emailAddress: user.emailAddress,
            identityNumber: user.identityNumber,
            createdAt: user.createdAt.toLocaleDateString('en-UK'),
            updatedAt: user.updatedAt.toLocaleDateString('en-UK')
        }
        await client.setEx(`user_${identityNumber}`, '600', JSON.stringify(rs));
        return rs;
    } catch (error) {
        throw error;
    }
}