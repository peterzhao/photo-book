const exec = require('child_process').execSync;
const logger = require('winston');
const path = require('path');

module.exports = (sourceDir, sourceFile, targetDir, category, maxSize) => {
  exec(`mkdir -p ${targetDir}`);
  const baseName = path.basename(sourceFile, '.jpg');
  const sourcePath = path.join(sourceDir, sourceFile);
  const targetPath = path.join(targetDir, `${baseName}+${category}`);
  exec(`sips -Z ${maxSize} ${sourcePath} --out ${targetPath}`);
  const size = exec(`sips -g pixelWidth -g pixelHeight ${targetPath} | tail -n 2 | cut -f2 -d':'`, { encoding: 'utf8' }).split('\n').map((element) => { return element.trim(); });
  logger.info(size);
  exec(`mv ${targetPath} ${targetPath}+${size[0]}x${size[1]}.jpg`);
};
