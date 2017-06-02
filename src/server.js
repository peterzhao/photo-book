const express = require('express');
const path = require('path');
const logger = require('winston');
const expressLayouts = require('express-ejs-layouts');
const photoService = require('./photo-service');
const sassMiddleware = require('node-sass-middleware');

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
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(sassMiddleware({
  src: path.join(__dirname, '..', 'sass'),
  dest: path.join(__dirname, '..', 'public', 'css'),
  debug: true,
  outputStyle: 'extended',
  prefix: '/css',
  log: (severity, key, value) => { logger.log(severity, 'node-saas-middleware   %s : %s', key, value); }
}));
app.get('/', (req, res) => {
  const title = process.env.PAGE_TITLE || 'My Photots';
  photoService(S3_BUCKET, S3_BUCKET_PATH).getPhotoList().then((photos) => {
    res.render('home', { photos, title });
  });
});
app.listen(8888, () => {
  logger.info('listening on 8888');
});
