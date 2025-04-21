const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');


router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/users', authMiddleware, userController.getAllUsers);
router.get('/profile', authMiddleware, userController.profileUsers);
router.put('/profile', authMiddleware, userController.editUsers);

module.exports = router;
