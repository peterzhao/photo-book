const service = require('../../src/photo-service');
const logger = require('winston');

if (process.env.S3_BUCKET === undefined) {
  throw Error('Environment variable S3_BUCKET must be set!');
}

service(process.env.S3_BUCKET, 'photos/publi').getPhotoList().then((res) => {
  logger.info(res);
});
