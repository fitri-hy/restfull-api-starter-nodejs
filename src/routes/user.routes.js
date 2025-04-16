const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

// Route Register
router.post('/register', userController.registerUser);

// Route Login
router.post('/login', userController.loginUser);

// Route List Users
router.get('/', authMiddleware, userController.getAllUsers);

module.exports = router;
