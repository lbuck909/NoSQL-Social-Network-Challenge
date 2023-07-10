//needed dependecies & controllers path
const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUserById,
  deleteUserById,
  addFriend,
  removeFriend,

} = require('../../controller/user-controller');

//GET and POST all users
router.route('/').get(getAllUsers).post(createUser);

//GET user id, PUT (update) user id & DELETE api/users/id
router.route('/:userId').get(getUserById).put(updateUserById).delete(deleteUserById);

//POST add friend & DELETE remove friend
router.route('/:userId'/friends/friendId).post(addFriend).delete(removeFriend);

module.exports = router;