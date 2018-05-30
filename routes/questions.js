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

const jwtAuth = passport.authenticate('jwt', { session: false, failWithError: true });

router.get('/questions', (req, res, next) => {
  Question.find()
    .then(results => {
      res.json(results);
    }).catch(err => {
      console.log('Error from find', err);
      next(err);
    });
});


router.post('/questions', jwtAuth, (req, res, next) => {
  const { question, answer } = req.body;
  const newItem = { question, answer };

  Question.create(newItem)
    .then((result) => {
      res.location(`${req.originalUrl}/${result.id}`).status(201).json(result);
    })
    .catch(err => {
      next(err);
    });
});



module.exports = router;