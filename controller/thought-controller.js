const { Thought } = require('../models/Thought');
const User = require('../models/User');

const thoughtController = {
  // get all thoughts
async getThoughts(req, res) {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch(err) {
    res.status(500).json(err);
  }
},
//get one thought by user id
async getOneThought(req, res) {
  try{
    const thought = await Thought.findOne({ _id: req.params.courseId }).select('-__v');

    if(!thought) {
      return res.status(404).json({ message: "No thought found with this ID 💨!"});
    }
    res,json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
},
// update thought by user id
async updateThoughtById(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!thought) {
      res.status(404).json({ message: "No thought found with this ID 💨!"});
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
},
};
//create thought to one use


// add a reaction
//delete reaction
//delete thought