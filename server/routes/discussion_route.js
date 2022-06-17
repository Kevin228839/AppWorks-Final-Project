const express = require('express');
const router = express.Router();
const DiscussionController = require('../controllers/discussion_controller');

router.post('/api/v1/discussion', DiscussionController.postContent);

router.get('/api/v1/discussion', DiscussionController.getContent);

module.exports = router;
