'use strict';

const mongoose = require('mongoose');


const questionSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
});

questionSchema.set('toObject', {
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  }
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;