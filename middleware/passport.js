const LocalStrategy = require("passport-local").Strategy;
const User = require("../db/models/User");
const bcrypt = require("bcrypt");
const JWTStrategy = require("passport-jwt").Strategy;
const { fromAuthHeaderAsBearerToken } = require("passport-jwt").ExtractJwt;
const { JWT_SECRET } = require("../config/keys");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (passwordsMatch) {
        return done(null, user);
      }
    }
    return done(null, false);
  } catch (error) {
    done(error);
  }
});

exports.jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    if (Date.now() > jwtPayload.exp) {
      return done(null, false);
    }
    try {
      const user = await User.findOne(jwtPayload._id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  }
);
