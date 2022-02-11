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
      username: {
        type: String,
        required: true,
      },
      reactions:[reactionSchema]
       
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );