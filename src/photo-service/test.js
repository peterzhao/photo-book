const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const assert = chai.assert;
const sinon = require('sinon');
const photoService = require('../photo-service');

const { describe, beforeEach, it } = global;

describe('photoService', () => {
  const s3Stub = { endpoint: 's3-ca-central-1', api: {} };

  beforeEach(() => {
    s3Stub.api.listObjects = sinon.stub();
  });

  it('should get photo list from s3', () => {
    const photoListFromS3 = {
      Contents: [
        { Key: 'photos/public/75x100/Portrait/2017/IMG_1.jpg' },
        { Key: 'photos/public/75x100/Travel/2017/IMG_2.jpg' },
        { Key: 'photos/public/768x1024/Portrait/2017/IMG_1.jpg' },
        { Key: 'photos/public/768x1024/Travel/2017/IMG_2.jpg' },
        { Key: 'photos/public/768x1024/Portrait/2017/IMG_3.jpg' }
      ]
    };
    const photoList = [
      {
        thumnail: 'https://s3-ca-central-1/myBucket/photos/public/75x100/Portrait/2017/IMG_1.jpg',
        large: 'https://s3-ca-central-1/myBucket/photos/public/768x1024/Portrait/2017/IMG_1.jpg',
        category: 'Portrait'
      },
      {
        thumnail: 'https://s3-ca-central-1/myBucket/photos/public/75x100/Travel/2017/IMG_2.jpg',
        large: 'https://s3-ca-central-1/myBucket/photos/public/768x1024/Travel/2017/IMG_2.jpg',
        category: 'Travel'
      }
    ];
    s3Stub.api.listObjects.callsArgWith(1, undefined, photoListFromS3);
    return assert.eventually.deepEqual(
      photoService('myBucket', 'photos/public', s3Stub).getPhotoList(),
      photoList
    );
  });
});
