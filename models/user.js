const { Schema, model, Types  } = require('mongoose');
const userSchema = newSchema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email:{
      type: String,
      required: true,
      unique: true,
      validate:{
        validator: function(v) {
          return /^([\w\-\.]+)@([\w\-\.]+)\.([a-zA-Z]{2,5})$/.test(v);
        }
      } 
    }
  }

)