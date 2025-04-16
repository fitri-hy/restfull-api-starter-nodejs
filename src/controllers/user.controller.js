const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const validateUser = require('../utils/validator');
const sanitizeInput = require('../utils/sanitizer');

// Register
exports.registerUser = async (req, res) => {
    const { error, value } = validateUser(req.body, 'register');
    if (error) return res.status(400).json({ message: error.details[0].message });

    const data = sanitizeInput(value);
    const { name, email, password } = data;

    try {
        const userExists = await User.findOne({ where: { email } });
        if (userExists) return res.status(400).json({ message: 'Email has been registered' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashedPassword });

        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Login
exports.loginUser = async (req, res) => {
    const { error, value } = validateUser(req.body, 'login');
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { email, password } = sanitizeInput(value);

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(400).json({ message: 'Incorrect email or password' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json({ message: 'Incorrect email or password' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION || '1h'
        });

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email', 'createdAt']
        });
        res.status(200).json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
