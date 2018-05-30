'use strict';

const express = require('express');
const router = express.Router();
//const bodyParser = require('body-parser');
//const jsonParser = bodyParser.json();
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Question = require('../models/questions');
const passport = require('passport');
const LinkedList = require('../linkedList');
//const { JWT_SECRET, JWT_EXPIRY } = require('../config');
const seedData = require('../db/seed/questions.json');
const {updatePosition} = require('../linkedList');

const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });

router.get('/questions', (req, res, next) => {
  Question.find()
    .then(results => {
      res.json(results);
      // console.log(res.json(results));
    }).catch(err => {
      console.log('Error from find', err);
      next(err);
    });
});


router.post('/questions', jwtAuth, (req, res, next) => {
  let result = {
    feedback: 'You got it!',
    totalTries: 0,
    correctTries: 0
  };
  
  //first find user by id
  User.findById(req.user.id)
  //then get questions object
  //compare the req.body to the questions.head.value.answer
    .then(answer2 => { 
      let questions = answer2.questions;
      result.totalTries = questions.head.value.totalTries;
      result.correctTries = questions.head.value.correctTries;
      result.answer = questions.head.value.answer;
      if(answer2.questions.head.value.answer === req.body.answer) { 
        questions = updatePosition(questions, questions.head.value.mValue*2);
        result.correctTries++;
        result.totalTries++;
      } else { 
        questions = updatePosition(questions, 1);
        result.feedback = 'Sorry try again';
        result.totalTries++;
      } 

      // const{id}=req.params; const{image, answer} = req.body;
      //if same then increment both totalTries, correctTries +1, set mValue *2, call updatePosition helper function.

      //if it

      // const { question, answer } = req.body;
      // const newItem = { question, answer };

      return User.findByIdAndUpdate(req.user.id, { $set: {questions}});
    })
    .then((result) => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      next(err);
    });
});



module.exports = router;