const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user_controller');

// User Signup api
router.post('/api/v1/signup', UserController.signUP);

// User Signin api
router.post('/api/v1/signin', UserController.signIn);

// User profile api
router.get('/api/v1/profile', UserController.getProfile);
