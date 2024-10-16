const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Secret key for signing the JWT
const SECRET_KEY = 'mercedesbenz';

// Sample user for login
const user = {
    id: 1,
    username: 'bheshraj',
    password: 'nodejs123'
};

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Check if user exists and password is correct
    if (username === user.username && password === user.password) {
        // Generate a JWT
        const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
        return res.json({ token });
    }
    return res.status(401).json({ message: 'Invalid credentials' });
});

// Protected route
app.get('/protected', (req, res) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    // Verify the token
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        return res.json({ message: 'This is a protected route', user: decoded });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
