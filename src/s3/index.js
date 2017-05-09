const AWS = require('aws-sdk');

const endpoint = process.env.S3_ENDPOINT;

const api = new AWS.S3({
  endpoint,
  signatureVersion: 'v4',
  region: 'ca-central-1'
});

module.exports = { endpoint, api };
