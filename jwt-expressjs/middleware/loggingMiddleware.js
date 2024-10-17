const fs = require('fs');
const path = require('path');

const logger = (req, res, next) => {
    const log = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
    fs.appendFile(path.join(__dirname, '../logs/request.log'), log, (err) => {
        if (err) {
            console.error('Failed to write to log file:', err);
        }
    });
    next();
};

module.exports = logger;
