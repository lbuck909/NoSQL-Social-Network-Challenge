const { User } = require('../models');
// const { ObjectId } = require('mongoose').Types;

//get one user by id
const UserController = {
getUserById(req, res) {
  User.findOne({ _id: req.params.id })
  .then((user) =>{
    if (!user) {
    res.status(404).json({ message: "User not found with that ID!" });
  }else{
    res.json(user);
  }
  })
  .catch((err) =>{
    res.status(500).json(err);
  });
}
}


//get all users
//update user by id
//create user
//delete user
//add a friend to the list
//remove a friend from the friend list
