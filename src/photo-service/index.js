const s3Default = require('../s3');

module.exports = (bucket, path, s3 = s3Default) => {
  const params = {
    Bucket: bucket,
    Prefix: path,
    EncodingType: 'url'
  };

  const transform = (photos) => {
    const result = [];
    photos.Contents.forEach((content) => {
      const thumbnail = `https://${s3.endpoint}/${bucket}/${content.Key}`;
      if (thumbnail.indexOf('180x240') > -1) {
        const large = thumbnail.replace('180x240', '768x1024');
        const category = thumbnail.match(/180x240\/([a-zA-Z0-9]+)/)[1];
        result.push({
          thumbnail,
          large,
          category
        });
      }
    });
    return result;
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
