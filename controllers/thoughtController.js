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

    },
    async deleteThought(req, res) {

    },
    async createReaction(req, res) {

    },
    async removeReaction(req, res) {

    },
};