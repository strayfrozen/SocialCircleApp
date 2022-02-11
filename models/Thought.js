const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const thoughtSchema = new Schema(
    {
        thoughtText: {
        type: String,
        required: true,
        //Between 1 and 280 charachters
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
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