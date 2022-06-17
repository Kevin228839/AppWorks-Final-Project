const utils = require('../utils');
const jwt = require('jsonwebtoken');
const DiscussionModel = require('../models/discussion_model');

const postContent = async (req, res, next) => {
  try {
    let accessToken = req.get('Authorization');
    accessToken = await utils.modifyJwt(accessToken, req, res, next);
    const userId = jwt.verify(accessToken, process.env.secret).userid;
    const text = req.body.content;
    await DiscussionModel.postContent(userId, text);
    res.status(200).json({ response: 1 });
  } catch (err) {
    next(err);
  }
};

const getContent = async (req, res, next) => {
  try {
    const page = req.query.paging;
    const response = await DiscussionModel.getContent(page);
    res.status(200).json({ response });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  postContent,
  getContent
};
