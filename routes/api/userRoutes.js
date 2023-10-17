const router = require('express').Router();
const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController');

router.route('/users')
    .get(getAllUsers)
    .get(getSingleUser)
    .post(createUser);

router.route('/users/:userId')
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;