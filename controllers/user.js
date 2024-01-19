const User = require('../services/user');
const Validator = require('fastest-validator');

const v = new Validator();

exports.store = async (req, res) => {
    const schema = {
        userName : 'string|empty:false',
        accountNumber : 'number|empty:false',
        emailAddress : 'email|empty:false',
        identityNumber : 'number|empty:false'
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return res.status(400).json(validate);
    }
    try {
        const user = await User.createUser(req.body);
        if (!user) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        res.status(200).json({
            message: "User created successfully",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

exports.index = async (req, res) => {
    try {
        const users = await User.getAllUsers(req.query);
        if (users.length === 0) {
            return res.status(404).json({
                message: "Users not found"
            });
        }
        res.status(200).json({
            message: "Get users successfully",
            data: users
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

exports.show = async (req, res) => {
    try {
        const user = await User.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "Get user successfully",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

exports.showByAccountNumber = async (req, res) => {
    try {
        const user = await User.getUserByAccountNumber(req.params.accountNumber);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "Get user successfully",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

exports.showByIdentityNumber = async (req, res) => {
    try {
        console.log(req.params.identityNumber);
        const user = await User.getUserByIdentityNumber(req.params.identityNumber);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "Get user successfully",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

exports.update = async (req, res) => {
    const schema = {
        userName : 'string|empty:false',
        accountNumber : 'number|empty:false',
        emailAddress : 'email|empty:false',
        identityNumber : 'number|empty:false'
    }
        
    const validate = v.validate(req.body, schema);
        
    if (validate.length){
        return res.status(400).json(validate);
    }
    try {
        const user = await User.updateUser(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "User updated successfully",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

exports.destroy = async (req, res) => {
    try {
        const user = await User.deleteUser(req.params.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        res.status(200).json({
            message: "User deleted successfully",
            data: user
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}