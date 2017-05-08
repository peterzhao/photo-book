const express = require('express');
const logger = require('winston');

const app = express();

app.use(express.static('public'));

app.listen(8888, () => {
  logger.info('listening on 8888');
});
