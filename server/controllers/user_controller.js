const jwt = require('jsonwebtoken');
const UserModel = require('../models/user_model');
const utils = require('../utils');

const signUP = async (req, res, next) => {
  try {
    // check email regex
    const re = /\S+@\S+\.\S+/;
    if (!re.test(req.body.email)) {
      res.status(400).json({ message: -2 });
      return;
    }
    const response = await UserModel.signUp(req.body);
    if (response === -1) {
      res.status(400).json({ message: -1 });
      return;
    } else {
      res.status(200).json({ message: 1 });
      return;
    }
  } catch (err) {
    console.error('Error while signing up', err.message);
    next(err);
  };
};

const signIn = async (req, res, next) => {
  try {
    const token = await UserModel.signIn(req.body);
    if (token === -1) {
      res.status(400).send({ message: -1 });
      return;
    } else {
      res.status(200).send({ message: token });
      return;
    }
  } catch (err) {
    console.error('Error while signing in', err.message);
    next(err);
  }
};

const getProfile = async (req, res, next) => {
  try {
    let accessToken = req.get('Authorization');
    accessToken = await utils.modifyJwt(accessToken, req, res, next);
    const result = jwt.verify(accessToken, process.env.secret);
    res.status(200).json({ message: [result.user, result.email] });
  } catch (err) {
    console.error('Error while getting user profile', err.message);
    next(err);
  }
};

module.exports = {
  signUP,
  signIn,
  getProfile
};
