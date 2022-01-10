const path = require('path');
const fs = require('fs');

const schemaPath = path.join(
  __dirname,
  './src/schema.graphql'
);

module.exports = {
  schemaPath: fs.existsSync(schemaPath) ? schemaPath : null,
};
