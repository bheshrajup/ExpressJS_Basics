// Import utilities and helpers
const logMessage = require('./utilities/logger');
const formatDate = require('./utilities/dateFormatter');
const calculateAverage = require('./utilities/mathUtils');
const readFileData = require('./utilities/fileReader');
const capitalizeFirstLetter = require('./utilities/stringUtils');

const sendEmail = require('./helpers/emailHelper');
const sendNotification = require('./helpers/notificationHelper');

// Import user controller (business logic)
const { getUserInfo, calculateUserScoreAverage } = require('./controllers/userController');

// Example user data
const user = {
    name: 'Bheshraj Upadhyaya',
    email: 'bheshraj.up@example.com',
    signupDate: new Date(),
    scores: [85, 90, 78, 92]
};

// Log a message with the current date and time
logMessage('Application has started.');

// Format the user's signup date
const formattedSignupDate = formatDate(user.signupDate);
logMessage(`User signed up on: ${formattedSignupDate}`);

// Use string utility to capitalize the user's name
const capitalizedUserName = capitalizeFirstLetter(user.name);
logMessage(`User name after capitalization: ${capitalizedUserName}`);

// Send email and notification
sendEmail(user.email, 'Welcome!', `Hello, ${capitalizedUserName}! Thanks for signing up.`);
sendNotification(capitalizedUserName, 'Welcome to our platform!');

// Use the controller to fetch user info and calculate score average
getUserInfo(user);
calculateUserScoreAverage(user.scores);

// Read data from a file (example file reading utility)
const filePath = './data/sample.txt';  // Assume you have this file in your project
const fileContent = readFileData(filePath);
logMessage(`File content: ${fileContent}`);

// Use the math utility to calculate the average of an array of numbers
const numbers = [10, 20, 30, 40, 50];
const average = calculateAverage(numbers);
logMessage(`The average of the numbers is: ${average}`);
