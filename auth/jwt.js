'use strict';

const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
// const config = require('../config');
const passport = require('passport');

//Setting up JWT login strategy
const { JWT_SECRET } = require('../config');
console.log(JWT_SECRET);
const options = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  algorithms: ['HS256']
};

const jwtStrategy = new JwtStrategy(options, (payload, done) => {
  done(null, payload.user);
});


passport.use(jwtStrategy);
module.exports = jwtStrategy;