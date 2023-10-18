const { Thought, User } = require('../models');

module.exports = {

    //GET all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //GET to get a single thought by its _id
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

    // POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId }, //include userId: "" in the req.body
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ message: 'Thought created, but no users with this ID...' });
            }

            return res.json({ message: 'Thought created!' });
        } catch (err) {
            console.error(err)
            return res.status(500).json(err);
        }
    },

    //PUT to update a thought by its _id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            return res.status(200).json(thought);
        } catch (err) {
            console.log('Uh Oh, something went wrong..Could not update thought.');
            return res.status(500).json({ message: 'Something went wrong! Could not update thought.' });
        }
    },

    //DELETE to remove a thought by its _id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            return res.json({ message: 'Thought successfully deleted!' });

        } catch (err) {
            console.log('Uh Oh, something went wrong..Could not delete thought.');
            return res.status(500).json({ message: 'Something went wrong! Could not delete thought.' });
        }
    },

    //POST to create a reaction stored in a single thought's reactions array field
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate( 
                { _id: req.params.thoughtId }, //find a thought by its thoughtId
                { $addToSet: { reactions: req.body } }, //add a reaction to the reactions array with addToSet
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thoughts with this id!' });
            }

            return res.json({ message: 'Reaction added!' });
        } catch (err) {
            console.error(err)
            return res.status(500).json({ message: 'Something went wrong! Could not create reaction.' });
        }
    },

    //DELETE to pull and remove a reaction by the reaction's reactionId value
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate( //find a thought by its thoughtId
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.body.reactionId } } }, //pulls the reaction out of the reactions array based on the reactionId value
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thoughts with this ID to be removed!' });
            }

            return res.json({ message: 'Reaction removed!' });

        } catch (err) {
            console.error(err)
            return res.status(500).json({ message: 'Something went wrong! Could not remove reaction.' });
        }
    },
};