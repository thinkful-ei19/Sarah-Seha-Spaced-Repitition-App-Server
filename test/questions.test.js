'use strict';

const { app } = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const express = require('express');
const expect = chai.expect;
const { TEST_DATABASE_URL, JWT_SECRET  } = require('../config');
const User = require('../models/users');
chai.use(chaiHttp);

const jwt = require('jsonwebtoken');

//const { dbConnect, dbDisconnect } = require('../db-mongoose');
const seedUsers = require('../db/seed/users');
describe('Before and After Hooks', function () {
  let token;
  before(function () {
    return mongoose.connect(TEST_DATABASE_URL, { autoIndex: false });
  });

  beforeEach(function () {
    return User.create(seedUsers)
      .then(() => User.find())
      .then(response => {
        response = response[0];
        token = jwt.sign(
          {
            user: {
              email: response.email,
              id: response.id
            }
          },
          JWT_SECRET,
          {
            algorithm: 'HS256',
            subject: response.email,
            expiresIn: '7d'
          }
        );
      });
  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });

  after(function () {
    return mongoose.disconnect();
  });

  describe('GET /questions', function () {
    it('should return the first question', function () {
      return chai
        .request(app)
        .get('/api/questions')
        .set('authorization', `Bearer ${token}`)
        .then(response => {
          expect(response).to.have.status(200);
          expect(response.body.question).to.not.eql(null);
        });
    });
  });

  describe('POST /questions', function () {
    it('Should give correct feedback on the right answer', function () {
      let answer = { answer: 'stand mixer' };
      return chai
        .request(app)
        .post('/api/questions')
        .set('authorization', `Bearer ${token}`)
        .send(answer)
        .then(response => {
          expect(response).to.have.status(200);
          expect(response.body.feedback).to.eql('Correct');
        });
    });

    it('Should give incorrect feedback on the wrong answer', function () {
      let answer = { answer: 'standing mixer' };
      return chai
        .request(app)
        .post('/api/questions')
        .set('authorization', `Bearer ${token}`)
        .send(answer)
        .then(response => {
          expect(response).to.have.status(200);
          expect(response.body.feedback).to.eql('Incorrect');
        });
    });
  });
});
