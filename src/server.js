const express = require('express');
const logger = require('winston');
const expressLayouts = require('express-ejs-layouts');
const photoService = require('./photo-service');

const requiredEnvs = ['S3_BUCKET',
  'S3_BUCKET_PATH',
  'S3_ENDPOINT',
  'AWS_SECRET_ACCESS_KEY',
  'AWS_ACCESS_KEY_ID'];

requiredEnvs.forEach((variable) => {
  if (process.env[variable] === undefined) {
    throw Error(`Environment variable ${variable} is missing!`);
  }
});

const { S3_BUCKET, S3_BUCKET_PATH } = process.env;

const app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(expressLayouts);


app.get('/', (req, res) => {
  photoService(S3_BUCKET, S3_BUCKET_PATH).getPhotoList().then((photos) => {
    res.render('home', { photos });
  });
});


app.listen(8888, () => {
  logger.info('listening on 8888');
});
