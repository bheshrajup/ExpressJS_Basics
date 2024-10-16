// controllers/userController.js
const logMessage = require('../utilities/logger');
const formatDate = require('../utilities/dateFormatter');
const calculateAverage = require('../utilities/mathUtils');
const sendEmail = require('../helpers/emailHelper');
const sendNotification = require('../helpers/notificationHelper');

const getUserInfo = (user) => {
   logMessage(`Fetching information for user: ${user.name}`);
   
   const formattedDate = formatDate(user.signupDate);
   console.log(`User signed up on: ${formattedDate}`);

   sendEmail(user.email, 'Welcome!', 'Thanks for signing up!');
   sendNotification(user.name, 'Welcome to our platform!');
};

const calculateUserScoreAverage = (scores) => {
   const average = calculateAverage(scores);
   console.log(`User average score is: ${average}`);
};

module.exports = { getUserInfo, calculateUserScoreAverage };
