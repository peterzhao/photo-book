const fs = require('fs');
const path = require('path');
const readDir = require('readdir');
const logger = require('winston');
const exec = require('child_process').execSync;
const resize = require('./resize-photo');

const args = process.argv.slice(2);

if (args.length < 2) {
  logger.error('Missing required arguments.');
  logger.error('Usage: node re-sample-photos <sourceDir> <targetDir>');
  process.exit(1);
}

const sourceDir = args[0];
const targetDir = args[1];

if (!fs.existsSync(sourceDir) || !fs.statSync(sourceDir).isDirectory()) {
  logger.error(`${sourceDir} does not exist or is not a directory!`);
  process.exit(1);
}

exec(`mkdir -p ${targetDir} && rm -rf ${targetDir}/*`);

const sourceFiles = readDir.readSync(sourceDir, ['**.jpg']);
sourceFiles.forEach((sourceFile) => {
  const targetPhotoDir = path.join(targetDir, path.dirname(sourceFile));
  resize(sourceDir, sourceFile, targetPhotoDir, 'large', 1600);
  resize(sourceDir, sourceFile, targetPhotoDir, 'med', 1024);
  resize(sourceDir, sourceFile, targetPhotoDir, 'small', 180);
});
