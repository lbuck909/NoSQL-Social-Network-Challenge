const { Schema, model, Types  } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//thoughtsText, username, reactions, and createdAt
const thoughtsSchema = new Schema(
  {
    thoughtsText: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    username: {
      type: String,
      required: true,
    },
    reactionData: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);



//reactionCount and virtuals
thoughtsSchema.virtual('reactionCount').get(function () {
return this.reactions.length;
});
const Thought = model('Thought, thoughtSchema');
module.exports = Thought;