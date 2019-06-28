const trim = require('lodash/trim');
const processData = require('./processData');

module.exports = (client, updatedOptions, data, workObject) => {
  data.split('\n').forEach(jsonDataStr => {
    if (trim(jsonDataStr).length) {
      try {
        processData(client, updatedOptions, JSON.parse(trim(jsonDataStr)), workObject);
      } catch(e) {
        console.error(e.message);
      }
    }
  });
};
