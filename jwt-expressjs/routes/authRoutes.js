const express = require('express');
const { signUp, login, refreshToken } = require('../controllers/authController');
const router = express.Router();

// User sign-up route
router.post('/signup', signUp);

// User login route
router.post('/login', login);

// Refresh token route
router.post('/refresh-token', refreshToken);

module.exports = router;
