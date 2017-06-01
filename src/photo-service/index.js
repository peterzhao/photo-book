const s3Default = require('../s3');

module.exports = (bucket, path, s3 = s3Default) => {
  const params = {
    Bucket: bucket,
    Prefix: path,
    EncodingType: 'url'
  };

  const transform = (photos) => {
    const result = {};
    photos.Contents.map((e) => { return e.Key; })
    .forEach((content) => {
      const indexOfSize = content.indexOf('%2B');
      const name = content.substring(0, indexOfSize);
      const decoration = content.substring(indexOfSize);
      const sizeName = decoration.split('%2B')[1];
      const sizeExtension = decoration.split('%2B')[2];
      const size = sizeExtension.substring(0, sizeExtension.length - 4);
      const width = size.split('x')[0];
      const height = size.split('x')[1];
      const category = content.split('/')[2];
      const url = `https://${s3.endpoint}/${bucket}/${content}`;
      if (!result[name]) result[name] = { category };
      result[name][sizeName] = { url, w: width, h: height };
    });
    return Object.keys(result).map((k) => { return result[k]; });
  };

  const photoListPromise = new Promise((resolve, reject) => {
    s3.api.listObjects(params, (err, data) => {
      if (err) reject(err);
      else resolve(transform(data));
    });
  });

  const getPhotoList = () => {
    return photoListPromise;
  };

  return { getPhotoList };
};
