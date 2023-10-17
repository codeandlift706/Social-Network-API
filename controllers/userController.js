const { User } = require('../models');

module.exports = {

    //GET all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //GET a single user by its _id and populated thought and friend data
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .populate('thoughts') //this references the field name in the user model
            .populate('friends'); //this references the field name in the user model
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //POST a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    //PUT to update a user by its _id
    async updateUser(req, res) {
        try {
            const result = await User.findOneAndUpdate({ _id: req.params.userId }, { new: true });
            res.status(200).json(result);
            console.log(`Updated user ${result}`);
        } catch (err) {
            console.log('Uh Oh, something went wrong..Could not update user.');
            res.status(500).json({ message: 'Something went wrong! Could not update user.' });
        }
    },

    //DELETE to remove user by its _id
    async deleteUser(req, res) {
        try {
            const result = await User.findOneAndDelete({ _id: req.params.userId });
            res.status(200).json(result);
            console.log(`Deleted user ${result}`);
        } catch (err) {
            console.log('Uh Oh, something went wrong..Could not delete user.');
            res.status(500).json({ message: 'Something went wrong! Could not delete user.' });
        }
    },

    //POST to add a new friend to a user's friend list
    async addFriend(req, res) {
        try {
            // const user = await User.create(req.body);
            const user = await User.findOneAndUpdate( //?????????
                { id: req.body.userId },
                { $push: { friends: user._id } },
                { new: true } //???????
            );
            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No users with this ID to add to their friend list ' });
            }
            res.json({ message: 'Friend added!' });
        } catch (err) {
            console.error(err)
            res.status(500).json(err);
        }
    },

    //DELETE to remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndRemove( //?????????
                { id: req.body.userId },
                { $shift: { friends: user._id } },
                { new: true } //???????
            );
            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No users with this ID to remove from the friend list ' });
            }
            res.json({ message: 'Friend removed!' });
        } catch (err) {
            console.error(err)
            res.status(500).json(err);
        }
    },
};