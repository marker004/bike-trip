const path = require('path');
const fs = require('fs');

const kmlDir = path.join(process.cwd(), 'public', 'files');
fileNames = fs.readdirSync(kmlDir);

module.exports = fileNames;
