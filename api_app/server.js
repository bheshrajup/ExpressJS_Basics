const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const PORT = 5000;

// Define the path to the user data file
const userInfoPath = path.join(__dirname, 'data.json');

// Function to read user data from the file
const readUsersFile = () => {
    const userData = fs.readFileSync(userInfoPath, 'utf8');
    return JSON.parse(userData);
};

// Function to write user data to the file
const writeUsersFile = (users) => {
    const updatedContent = JSON.stringify(users);
    fs.writeFileSync(userInfoPath, updatedContent, 'utf8');
};

// Create HTTP server
const server = http.createServer((req, res) => {
    console.log("Received request:", req.url, req.method);

    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    // Create a new user
    if (req.url === '/api/users' && req.method === 'POST') {
        let body = '';
        
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            const reqData = JSON.parse(body);
            const users = readUsersFile();

            if (reqData.name && reqData.email && reqData.username && reqData.password) {
                const newUser = {
                    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
                    name: reqData.name,
                    email: reqData.email,
                    username: reqData.username,
                    password: reqData.password
                };

                users.push(newUser);
                writeUsersFile(users);

                res.writeHead(201, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: 'true', message: 'User created successfully.', id: newUser.id }));
            } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: 'false', message: 'Please provide all fields.' }));
            }
        });
    
    // Get users by ID or all users
    } else if (req.url.startsWith('/api/users') && req.method === 'GET') {
        const queryObject = url.parse(req.url, true).query;
        const users = readUsersFile();

        if (queryObject.id) {
            const user = users.find(user => user.id == queryObject.id);
            if (user) {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify(user));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: 'false', message: 'User not found with given ID.' }));
            }
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify(users));
        }

    // Delete a user
    } else if (req.url.startsWith('/api/users') && req.method === 'DELETE') {
        const queryObject = url.parse(req.url, true).query;
        const users = readUsersFile();

        if (queryObject.id) {
            const userExists = users.some(user => user.id == queryObject.id);
            if (userExists) {
                const updatedUsers = users.filter(user => user.id != queryObject.id);
                writeUsersFile(updatedUsers);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: 'true', message: 'User deleted successfully.', id: queryObject.id }));
            } else {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: 'false', message: "User doesn't exist.", id: queryObject.id }));
            }
        }

    // Update a user
    } else if (req.url === '/api/users' && req.method === 'PATCH') {
        let body = '';
        
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            const reqData = JSON.parse(body);
            const users = readUsersFile();
            const userIndex = users.findIndex(user => user.id == reqData.id);

            if (userIndex !== -1) {
                users[userIndex] = { ...users[userIndex], ...reqData };
                writeUsersFile(users);

                res.writeHead(200, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify({ success: 'true', message: 'User updated successfully.', ...users[userIndex] }));
            }
        });

    // Handle invalid routes
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ message: 'Resource not found.' }));
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}.`);
});
