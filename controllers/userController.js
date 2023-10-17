const { User } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async updateUser(req, res) {
        try {
            const result = await User.findOneAndUpdate({ userId: req.params.userId }, { new: true });
            res.status(200).json(result);
            console.log(`Updated user ${result}`);
        } catch (err) {
            console.log('Uh Oh, something went wrong..Could not update user.');
            res.status(500).json({ message: 'Something went wrong! Could not update user.' });
        }
    },

    async deleteUser(req, res) {
        try {

        } catch (err) {

        }
    },

    async addFriend(req, res) {
        try {

        } catch (err) {

        }
    },

    async removeFriend(req, res) {
        try {

        } catch (err) {

        }
    },
};