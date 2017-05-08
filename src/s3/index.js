const AWS = require('aws-sdk');

if (process.env.S3_ENDPOINT === undefined) {
  throw Error('Environment variable S3_ENDPOINT must be set!');
}
const endpoint = process.env.S3_ENDPOINT;

const api = new AWS.S3({
  endpoint,
  signatureVersion: 'v4',
  region: 'ca-central-1'
});

module.exports = { endpoint, api };
