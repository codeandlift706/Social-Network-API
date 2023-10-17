const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

router.route('/users')
    .get(getAllUsers)
    .get(getSingleUser)
    .post(createUser);

router.route('/users/:userId')
    .put(updateUser)
    .delete(deleteUser);

router.route('/users/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;