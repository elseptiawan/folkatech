const User = require('../models/user');
const { param } = require('../routes/users');

exports.getUsers = async (params) => {
    try {
        const users = await User.find();
        return users;
    } catch (error) {
        throw error;
    }
}

exports.checkUserExist = async (params) => {
    try {
        const user = await User.findOne({
            $or: [
              { userName: params.userName },
              { accountNumber: params.accountNumber },
              { emailAddress: params.emailAddress },
              { identityNumber: params.identityNumber}
            ]
          });
        return user;
    } catch (error) {
        throw error;
    }
}

exports.getUser = async (params) => {
    try {
        const user = await User.findOne(params);
        return user;
    } catch (error) {
        throw error;
    }
}

exports.createUser = async (body) => {
    try {
        const user = new User(body);
        const result = await user.save();
        return result;
    } catch (error) {
        throw error;
    }
}

exports.updateUser = async (id, body) => {
    try {
        const user = User.findByIdAndUpdate(id, body)
        return user;
    } catch (error) {
        throw error;
    }
}

exports.deleteUser = async (id) => {
    try {
        const user = User.findByIdAndDelete(id)
        return user;
    } catch (error) {
        throw error;
    }
}