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
        { Key: 'photos/public/Portrait/2017/IMG_1%2Bsmall%2B180x240.jpg' },
        { Key: 'photos/public/Travel/2017/IMG_2%2Bsmall%2B180x240.jpg' },
        { Key: 'photos/public/Portrait/2017/IMG_1%2Bmed%2B1047x768.jpg' },
        { Key: 'photos/public/Travel/2017/IMG_2%2Bmed%2B1047x768.jpg' },
        { Key: 'photos/public/Portrait/2017/IMG_1%2Blarge%2B1600x1200.jpg' },
        { Key: 'photos/public/Travel/2017/IMG_2%2Blarge%2B1600x1200.jpg' }
      ]
    };
    const photoList = [
      {
        small: { url: 'https://s3-ca-central-1/myBucket/photos/public/Portrait/2017/IMG_1%2Bsmall%2B180x240.jpg', w: '180', h: '240' },
        med: { url: 'https://s3-ca-central-1/myBucket/photos/public/Portrait/2017/IMG_1%2Bmed%2B1047x768.jpg', w: '1047', h: '768' },
        large: { url: 'https://s3-ca-central-1/myBucket/photos/public/Portrait/2017/IMG_1%2Blarge%2B1600x1200.jpg', w: '1600', h: '1200' },
        category: 'Portrait'
      },
      {
        small: { url: 'https://s3-ca-central-1/myBucket/photos/public/Travel/2017/IMG_2%2Bsmall%2B180x240.jpg', w: '180', h: '240' },
        med: { url: 'https://s3-ca-central-1/myBucket/photos/public/Travel/2017/IMG_2%2Bmed%2B1047x768.jpg', w: '1047', h: '768' },
        large: { url: 'https://s3-ca-central-1/myBucket/photos/public/Travel/2017/IMG_2%2Blarge%2B1600x1200.jpg', w: '1600', h: '1200' },
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
