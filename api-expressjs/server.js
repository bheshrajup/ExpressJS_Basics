//Import the modules
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Function to read data from JSON file with error handling for empty files
const readDataFromFile = () => {
    try {
        const data = fs.readFileSync('data.json', 'utf8');
        if (data) {
            return JSON.parse(data);
        } else {
            return []; // Return an empty array if the file is empty
        }
    } catch (error) {
        console.error('Error reading or parsing data from file:', error);
        return [];
    }
};

// Function to write data to JSON file
const writeDataToFile = (data) => {
    try {
        fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing data to file:', error);
    }
};

// GET request for all users or search by name
app.get('/users', (req, res) => {
    const data = readDataFromFile();
    const searchName = req.query.name;

    // Filter the data by name if the name query is present
    let filteredData = data;
    if (searchName) {
        filteredData = data.filter(item =>
            item.name.toLowerCase().includes(searchName.toLowerCase())
        );
    }

    res.json(filteredData);
});

// POST request to add a new user with name and address
app.post('/add-user', (req, res) => {
    const data = readDataFromFile();
    const { name, address } = req.body;

    if (!name || !address) {
        return res.status(400).json({ message: 'Both name and address are required' });
    }

    const newId = data.length > 0 ? data[data.length - 1].id + 1 : 1; // Increment ID
    const newEntry = { id: newId, name, address };
    data.push(newEntry);
    writeDataToFile(data);

    res.status(201).json({ message: 'User added successfully', id: newId });
});

// GET request for specific user by ID
app.get('/users/:id', (req, res) => {
    const data = readDataFromFile();
    const id = parseInt(req.params.id);
    const entry = data.find(item => item.id === id);

    if (entry) {
        res.json(entry);
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// PUT request to update a user by ID
app.put('/users/:id', (req, res) => {
    const data = readDataFromFile();
    const id = parseInt(req.params.id);
    const { name, address } = req.body;

    const index = data.findIndex(item => item.id === id);

    if (index !== -1) {
        data[index].name = name || data[index].name; // Update name  
        data[index].address = address || data[index].address; // Update address  
        writeDataToFile(data);
        res.json({ message: 'User updated successfully', id });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// DELETE request to delete a user by ID
app.delete('/users/:id', (req, res) => {
    const data = readDataFromFile();
    const id = parseInt(req.params.id);
    const index = data.findIndex(item => item.id === id);

    if (index !== -1) {
        data.splice(index, 1);
        writeDataToFile(data);
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
