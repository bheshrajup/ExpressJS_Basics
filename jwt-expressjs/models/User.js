let users = []; // Mock in-memory user storage

const findUserByEmail = (email) => {
    return users.find(user => user.email === email);
};

const addUser = (user) => {
    users.push(user);
};

module.exports = { findUserByEmail, addUser };
