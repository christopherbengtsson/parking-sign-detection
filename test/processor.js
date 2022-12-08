/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const formData = require('form-data');

function setupMultipartFormData(requestParams, context, ee, next) {
  const form = new formData();
  const imageStream = fs.createReadStream('./parkering.jpeg');

  form.append('image', imageStream);
  form.append('threshold', 0.6);
  requestParams.body = form;

  return next();
}

module.exports = {
  setupMultipartFormData,
};
