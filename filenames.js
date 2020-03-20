const path = require('path');
const fs = require('fs');

const kmlDir = path.join(process.cwd(), 'files', 'kmls');
fileNames = fs.readdirSync(kmlDir);

module.exports = fileNames;