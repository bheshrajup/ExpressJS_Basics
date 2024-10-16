
const logMessage = (message) => {
    const currentTime = new Date().toISOString();
    console.log(`[${currentTime}] - ${message}`);
 };
 
 module.exports = logMessage;
 