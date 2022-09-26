const router = require('express').Router();

const{
    getUsers,
    getUserId,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getUserId).delete(deleteUser).put(updateUser);

router.route('/:id/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;