const User = require('../models/User'); // Ensure this points to your user model
const { generateAccessToken, generateRefreshToken } = require('../utils/jwtUtils');

// User sign-up function
const signUp = (req, res) => {
    const { email, username, phone, fullName, age, dateOfBirth, gender, profilePic } = req.body;

    // Check for existing user
    const existingUser = User.findUserByEmail(email);
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    const newUser = {
        email,
        username,
        phone,
        fullName,
        age,
        dateOfBirth,
        gender,
        profilePic: profilePic || null, // Optional profile picture
        status: 'unverified', // Default status
    };

    User.addUser(newUser); // Add user to your in-memory storage
    return res.status(201).json({ message: 'User created successfully' });
};

// User login function
const login = (req, res) => {
    try {
        const { email, phone } = req.body;

        // Log the incoming data for debugging
        console.log('Login attempt:', { email, phone });

        // Check if user exists
        const user = User.findUserByEmail(email);
        
        // If user not found or phone does not match
        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }

        if (user.phone !== phone) {
            console.log('Phone number mismatch for user:', email);
            return res.status(401).json({ message: 'Unauthorized: Phone number mismatch' });
        }

        if (user.status === 'blocked') {
            console.log('User is blocked:', email);
            return res.status(403).json({ message: 'User is blocked' });
        }

        // Generate tokens
        const accessToken = generateAccessToken({ email: user.email });
        const refreshToken = generateRefreshToken({ email: user.email });
        return res.json({ accessToken, refreshToken });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Refresh token function
const refreshToken = (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    // Verify refresh token and generate new access token
    try {
        const user = verifyRefreshToken(token); // Ensure you implement this function
        const accessToken = generateAccessToken({ email: user.email });
        return res.json({ accessToken });
    } catch (err) {
        console.error('Error verifying refresh token:', err);
        return res.sendStatus(403); // Forbidden
    }
};

module.exports = { signUp, login, refreshToken };
