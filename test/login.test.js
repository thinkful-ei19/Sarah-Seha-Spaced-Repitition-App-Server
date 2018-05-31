'use strict';

const { app } = require('../index');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const jwt = require('jsonwebtoken');
const JwtStrategy = require('../auth/jwt');
const LocalStrategy = require('../auth/local-strategy');
const { dbConnect, dbDisconnect } = require('../db-mongoose');

chai.use(chaiHttp);

const mongoose = require('mongoose');
const { TEST_DATABASE_URL, JWT_SECRET } = require('../config');
const User = require('../models/users');


describe('Auth endpoints', function () {
  const firstname = 'test first';
  const lastname = 'test lastname';
  const username = 'testuser';
  const password = 'testpass';
  

  before(function () {
    return mongoose.connect(TEST_DATABASE_URL)
      .then(() => mongoose.connection.db.dropDatabase());
  });

  beforeEach(function () {

  });

  afterEach(function () {
    return mongoose.connection.db.dropDatabase();
  });

  after(function () {
    return mongoose.disconnect();
  });

  describe('POST api/login', function () {
    it('Should reject requests with no credentials', function () {
      return chai.request(app)
        .post('/api/login')
        .then(() => {
          expect.fail(null, null, 'Request should not succeed');
        })
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(400);
        });
    });
    it('Should reject incorrect usernames', function () {
      return chai.request(app)
        .post('/api/login')
        .send({ username: 'wrongUsername', password })
        .then(() => {
          expect.fail(null, null, 'Request should not succeed');
        })
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(422);
        });
    });
    it('Should reject incorrect passwords', function () {
      return chai.request(app)
        .post('/api/login')
        .send({ username, password: 'wrongPassword' })
        .then(() => {
          expect.fail(null, null, 'Request should not succeed');
        })
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(422);
        });
    });

  });
});
