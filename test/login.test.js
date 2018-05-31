// 'use strict';

// const { app } = require('../index');
// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const expect = chai.expect;
// const jwt = require('jsonwebtoken');
// const JwtStrategy = require('../auth/jwt');
// const LocalStrategy = require('../auth/local-strategy');

// chai.use(chaiHttp);

// const mongoose = require('mongoose');
// const { TEST_DATABASE_URL, JWT_SECRET } = require('../config');
// const User = require('../models/user');


// describe('Auth endpoints', function () {
//   const firstname = 'test first';
//   const lastname = 'test lastname';
//   const username = 'testUser';
//   const password = 'testPass';
  

//   before(function () {
//     return mongoose.connect(TEST_DATABASE_URL, { autoIndex: false });
//   });

//   beforeEach(function () {
//     return User.hashPassword(password)
//       .then(password => {
//         User.create({
//           username,
//           password,
//           firstname,
//           lastname
//         });
//       });
//   });

//   afterEach(function () {
//     return User.remove({});
//   });

//   after(function () {
//     return mongoose.disconnect();
//   });

//   describe('POST api/auth/login', function () {
//     it('Should reject requests with no credentials', function () {
//       return chai.request(app)
//         .post('/api/auth/login')
//         .then(() => {
//           expect.fail(null, null, 'Request should not succeed');
//         })
//         .catch(err => {
//           if (err instanceof chai.AssertionError) {
//             throw err;
//           }

//           const res = err.response;
//           expect(res).to.have.status(400);
//         });
//     });
//     it('Should reject incorrect usernames', function () {
//       return chai.request(app)
//         .post('/api/auth/login')
//         .send({ username: 'wrongUsername', password })
//         .then(() => {
//           expect.fail(null, null, 'Request should not succeed');
//         })
//         .catch(err => {
//           if (err instanceof chai.AssertionError) {
//             throw err;
//           }

//           const res = err.response;
//           expect(res).to.have.status(500);
//         });
//     });
//     it('Should reject incorrect passwords', function () {
//       return chai.request(app)
//         .post('/api/auth/login')
//         .send({ username, password: 'wrongPassword' })
//         .then(() => {
//           expect.fail(null, null, 'Request should not succeed');
//         })
//         .catch(err => {
//           if (err instanceof chai.AssertionError) {
//             throw err;
//           }

//           const res = err.response;
//           expect(res).to.have.status(500);
//         });
//     });
//     it('Should return a valid auth token', function () {
//       return chai.request(app)
//         .post('/api/auth/login')
//         .send({ username, password })
//         .then(res => {
//           console.log(res.users);
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('object');
//           const token = res.body.authToken;
//           expect(token).to.be.a('string');
//           const payload = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] });
//           expect(payload.user.username).to.equal(username);
//           expect(payload.user.firstname).to.equal(firstname);
//           expect(payload.user.lastname).to.equal(lastname);
//         });
//     });
//     it('Should return a valid auth token with a newer expiry date', function () {
//       const token = jwt.sign({
//         user: {
//           username,
//           firstname,
//           lastname
//         }
//       },
//       JWT_SECRET,
//       {
//         algorithm: 'HS256',
//         subject: username,
//         expiresIn: '7d'
//       });

//       return chai.request(app)
//         .post('/api/auth/refresh')
//         .set('Authorization', `Bearer ${token}`)
//         .then(res => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('object');
//           const token = res.body.authToken;
//           expect(token).to.be.a('string');
//           const payload = jwt.verify(token, JWT_SECRET, { algorithm: ['HS256'] });
//           expect(payload.user.username).to.equal(username);
//           expect(payload.user.firstname).to.equal(firstname);
//           expect(payload.user.lastname).to.equal(lastname);
//         });
//     });
//   });
// });
