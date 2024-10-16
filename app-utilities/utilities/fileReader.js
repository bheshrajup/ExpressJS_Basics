
const fs = require('fs');

const readFileData = (filePath) => {
   try {
      const data = fs.readFileSync(filePath, 'utf8');
      return data;
   } catch (error) {
      console.error(`Error reading file: ${error.message}`);
   }
};

module.exports = readFileData;
