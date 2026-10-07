const fs = require('node:fs');
const path = require('node:path');
function render(data) {
  const serialized = JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e').replace(/&/g, '\\u0026');
  return fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8').replace('__REPORT_DATA__', () => serialized);
}
module.exports = { render };
