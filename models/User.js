const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
        type: String,
        required: true,
        trim: true,
        //Unique
      },
      email: {
        type: String,
        required: true,
        trim: true,
        //Unique
      },
      thoughts: {
        type: String,
        required: true,
        enum: ['', 'Sad', 'Mad', 'Excited', 'Happy'],
        default: 'Happy'
      },
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        }
      ]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );