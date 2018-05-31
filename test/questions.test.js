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
describe('Testing for questions', function () {
  let token;
  let user;

  before(function () {
    return mongoose.connect(TEST_DATABASE_URL)
      .then(() => mongoose.connection.db.dropDatabase());
  });

  beforeEach(function () {
    return chai.request(app)
      .post('/api/users')
      .send({ username: 'testuser', password: 'testpasswpord' })
      .then(() => {
        return chai.request(app)
          .post('/api/login')
          .send({ username: 'testuser', password: 'testpassword' });
      })
      .then((res) => {
        token = res.body.authToken;
        const payload = jwt.verify(res.body.authToken, JWT_SECRET);
        user = payload.user;
      });
  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });

  after(function () {
    return mongoose.disconnect();
  });

  // describe('GET /questions', function () {
  //   it('should return the questions', function () {
  //     const dbPromise = User.findOne({ username: user.user5 });
  //     const apiPromise = chai.request(app)
  //       .get('/api/questions')
  //       .set('Authorization', `Bearer ${token}`);
  //     return Promise.all([dbPromise, apiPromise])
  //       .then(([data, res]) => {
  //         expect(res).to.have.status(200);
  //         expect(res).to.be.json;
  //         expect(res.body).to.be.a('object');
  //         expect(res.body).to.have.keys('feedback', 'totalTries', 'correctTries');
  //       });
        
  //   });
  // });

  // describe('POST /questions', function () {
  //   it('Should give correct feedback on the right answer', function () {
  //     let answer = { answer: 'stand mixer' };
  //     return chai
  //       .request(app)
  //       .post('/api/questions')
  //       .set('authorization', `Bearer ${token}`)
  //       .send(answer)
  //       .then(response => {
  //         expect(response).to.have.status(200);
  //         expect(response.body.feedback).to.equal('Correct');
  //       });
  //   });

  //   it('Should give incorrect feedback on the wrong answer', function () {
  //     let answer = { answer: 'standing mixer' };
  //     return chai
  //       .request(app)
  //       .post('/api/questions')
  //       .set('authorization', `Bearer ${token}`)
  //       .send(answer)
  //       .then(response => {
  //         expect(response).to.have.status(200);
  //         expect(response.body.feedback).to.equal('Incorrect');
  //       });
  //   });
  // });
});
