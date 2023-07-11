const { User } = require("../models");
const { ObjectId } = require("mongoose").Types;

//get one user by id
const userController = {
  getUserById(req, res) {
    User.findOne({ _id: req.params.id })
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "User not found with that ID!😮" });
        } else {
          res.json(user);
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  //get all users
  getAllUsers(req, res) {
    User.find({})
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  //update user by id
  updateUserById(req, res) {
    User.findOneAndUpdate(req.params.id, req.body, { new: true })
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: "User does not exist!🤔" });
        }
        res.json(userData);
      })
      .catch((err) => res.status(500).json(err));
  },

  //create user

  createUser(req, res) {
    console.log(req);
    User.create(req.body)
      .then((userData) => res.json(userData))
      .catch((err) => res.status(500).json(err));
  },

  //delete user
  deleteUserById(req, res) {
    User.findOneAndDelete(req.params.id)
      .then((userData) => {
        if (!userData) {
          return res.status(404).json({ message: "User does not exist!🤔" });
        }
        res.json({ message: "User has been deleted!😮" });
      })
      .catch((err) => res.status(500).json(err));
  },
  //add a friend to the list

  addFriend(req, res) {
    console.log("You are adding a friend😁");
    console.log(req.body);

    User.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { friend: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No friends found with that ID😞!" });
        } else {
          res.json(user);
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
  //remove a friend from the friend list
  removeFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { friend: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No friends found with that ID😞!" });
        } else {
          res.json(user);
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },
};
module.exports = userController;
