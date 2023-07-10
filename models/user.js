const { Schema, model, Types  } = require('mongoose');
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
//create a regex email validation
    email:{
      type: String,
      required: true,
      unique: true,
      match: [/^([\w\-\.]+)@([\w\-\.]+)\.([a-zA-Z]{2,3})$/, "Wrong email entered, please enter a valid email address"]
      }, 

    friends:[
      {
        type: Schema.Types.ObjectId,
        ref: "User"

      },
    ],
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought"
      },
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id:false
  });
// the virtual is called friendCount. shows up within query
  userSchema.virtual("friendCount").get(function() {
    return 
    this.friends.length;
  });
// create var using User & userschema. finish with module exports for user here
const User = model("User", userSchema);
module.exports = User;