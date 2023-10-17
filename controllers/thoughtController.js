const { Thought, User } = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { id: req.body.userId },
                { $push: { thoughts: thought._id } },
                { new: true }
            );
            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'thought created, but no users with this ID ' });
            }
            res.json({ message: 'thought created' });
        } catch (err) {
            console.error(err)
            res.status(500).json(err);
        }
    },
    async updateThought(req, res) {
        try {
            const result = await Thought.findOneAndUpdate( { _id: req.params.thoughtId }, { new: true });
            res.status(200).json(result);
            console.log(`Updated thought ${result}`);
        } catch (err) {
            console.log('Uh Oh, something went wrong..Could not update thought.');
            res.status(500).json({ message: 'Something went wrong! Could not update thought.' });
        }
    },

    async deleteThought(req, res) {
        try {
            const result = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
            res.status(200).json(result);
            console.log(`Deleted thought ${result}`);
        } catch (err) {
            console.log('Uh Oh, something went wrong..Could not delete thought.');
            res.status(500).json({ message: 'Something went wrong! Could not delete thought.' });
        }
    },
    async createReaction(req, res) {
        try {

        } catch (err) {

        }
    },
    async removeReaction(req, res) {
        try {

        } catch (err) {

        }
    },
};