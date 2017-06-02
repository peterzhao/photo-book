const exec = require('child_process').execSync;
const logger = require('winston');
const path = require('path');

const getSize = (photoPath) => {
  return exec(`sips -g pixelWidth -g pixelHeight '${photoPath}' | tail -n 2 | cut -f2 -d':'`, { encoding: 'utf8' }).split('\n').map((element) => { return element.trim(); });
};

module.exports = (sourceDir, sourceFile, targetDir, category, maxSize, isThumbnail = false) => {
  exec(`mkdir -p ${targetDir}`);
  const baseName = path.basename(sourceFile, '.jpg');
  const sourcePath = path.join(sourceDir, sourceFile);
  const targetPath = path.join(targetDir, `${baseName}+${category}`);
  logger.info(sourcePath);
  logger.info(targetPath);
  if (isThumbnail) {
    const sourceSize = getSize(sourcePath);
    const minSize = Math.min(parseInt(sourceSize[0], 10), parseInt(sourceSize[1], 10));
    exec(`sips -c ${minSize} ${minSize} '${sourcePath}' --out '${targetPath}'`);
    exec(`sips -Z ${maxSize} '${targetPath}'`);
  } else {
    exec(`sips -Z ${maxSize} '${sourcePath}' --out '${targetPath}'`);
  }
  const size = getSize(targetPath);
  exec(`mv '${targetPath}' '${targetPath}+${size[0]}x${size[1]}.jpg'`);
};
