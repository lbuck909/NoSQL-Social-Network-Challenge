const router = require('express').Router();
const {
  getThoughts,
  getOneThought,
  updateThoughtById,
  createThought,
  deleteThought,
  createReaction,
  deleteReaction,

} = require('../../controller/thought-controller')

// route for GET & POST all thoughts
router.route('/').get(getThoughts).post(createThought);

// routes to GET, PUT, & DELETE thoughts by id
router.route('/:thoughtId').get(getOneThought).put(updateThoughtById).delete(deleteThought);


// route to DELETE reaction to Thought
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

//POST reaction for Thought
router.route('/:thoughtId/reactions').post(createReaction);

module.exports = router;