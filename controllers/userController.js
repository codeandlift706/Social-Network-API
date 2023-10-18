const { User } = require('../models');

module.exports = {

    //GET all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();
            return res.json(users);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    //GET a single user by its _id and populated thought and friend data
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .populate('thoughts') //this references the field name, thoughts, in the user model
                .populate('friends'); //this references the field name, friends, in the user model
            
                if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            return res.json(user);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    //POST a new user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            return res.json(user);
        } catch (err) {
            return res.status(500).json(err)
        }
    },

    //PUT to update a user by its _id
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId }, 
                { runValidators: true, new: true }
                );

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            return res.status(200).json(user);
            console.log(`Updated user ${user}`);
        } catch (err) {
            console.log('Uh Oh, something went wrong..Could not update user.');
            return res.status(500).json({ message: 'Something went wrong! Could not update user.' });
        }
    },

    //DELETE to remove user by its _id
    //BONUS: Remove a user's associated thoughts when deleted
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete(
                { _id: req.params.userId }
                );
            
            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }
            
            await Thought.deleteMany({ _id: { $in: user.thoughts } });
            return res.json({ message: 'User and associated thoughts deleted!' })

        } catch (err) {
            console.log('Something went wrong...Could not delete user.');
            return res.status(500).json({ message: 'Something went wrong! Could not delete user.' });
        }
    },

    //POST to add a new friend to a user's friend list
    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate( 
                { _id: req.body.userId }, //find a user by their userId
                { $push: { friends: req.body.userId } }, //push into the friends array, by the user's userId path parameter
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'No users with this ID to add to their friend list' });
            }

            return res.json({ message: 'Friend added!' });
        } catch (err) {
            console.error(err)
            return res.status(500).json(err);
        }
    },

    //DELETE to remove a friend from a user's friend list
    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndRemove( 
                { _id: req.body.userId }, //find a user by their userId
                { $pull: { friends: req.body.userId } }, //pull them from the friends array, by the user's userId path parameter
                { new: true } //???????
            );
            if (!user) {
                return res.status(404).json({ message: 'No users with this ID to remove from the friend list ' });
            }

            return res.json({ message: 'Friend removed!' });
        } catch (err) {
            console.error(err)
            return res.status(500).json(err);
        }
    },
};