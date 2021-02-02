const mongoose = require('mongoose');
const validator = require('validator');

const isValid = (value) => {
  return validator.isLength(value, { min: 1, max: undefined });
};

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!isValid(value)) {
          throw new Error('Title must not be empty');
        }
      }
    },
    body: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!isValid(value)) {
          throw new Error('Body must not be empty');
        }
      }
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
