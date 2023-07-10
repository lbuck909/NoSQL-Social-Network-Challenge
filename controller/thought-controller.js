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
//create thought
async createThought(req, res) {
  try {
    const thought = await Thought.create(req.body);
    res.json(thought);
  }catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},
// create a reaction
async createReaction(req, res) {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToset: { reactions: req.body } },
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
//delete reaction
async deleteReaction(req, res) {
  try{
    const thought = await Thought.findOneAndDelete(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId}}},
      { runValidators: true, new: true}
    );
    if (!thought) {
      res.status(404).json({ message: "No thought found with this ID 💨!"});
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
},
//delete thought
async deleteThought(req, res) {
  try{
  const thought = await Thought.findByIdAndDelete({ _id:req.params.thoughtId});
  res.status(200).json(thought);
} catch (err) {
  res.status(500).json(err);
}
},
};

module.exports = thoughtController;






