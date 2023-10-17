const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

router.route('/thoughts')
    .get(getAllThoughts)
    .get(getSingleThought)
    .post(createThought);

router.route('/thoughts/:thoughtId')
    .put(updateThought)
    .delete(deleteThought);

router.route('/thoughts/:thoughtId/reactions')
    .post(createReaction)
    .delete(deleteReaction);

module.exports = router;