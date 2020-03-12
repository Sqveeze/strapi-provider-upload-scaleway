'use strict';

/**
 * Module dependencies
 */

/* eslint-disable no-unused-vars */
// Public node modules.
const _ = require('lodash');
const AWS = require('aws-sdk');

const trimParam = str => (typeof str === 'string' ? str.trim() : undefined);

module.exports = {
  provider: 'scaleway',
  name: 'Scaleway',
  auth: {
    access: {
      label: 'Access key',
      type: 'text',
    },
    secret: {
      label: 'Secret key',
      type: 'text',
    },
    region: {
      label: 'Region',
      type: 'enum',
      values: [
        'nl-ams',
        'fr-par',
      ],
    },
    bucket: {
      label: 'Bucket',
      type: 'text',
    },
  },
  init: config => {
    // configure Scaleway S3 bucket connection
    const S3 = new AWS.S3({
      accessKeyId: config.access,
      secretAccessKey: config.secret,
      sslEnabled: true,
      endpoint: `s3.${config.region}.scw.cloud`,
      params: {
        Bucket: trimParam(config.bucket),
      },
    });

    return {
      upload: file => {
        return new Promise((resolve, reject) => {
          // upload file on S3 bucket
          const path = file.path ? `${file.path}/` : '';
          S3.upload(
            {
              Key: `${path}${file.hash}${file.ext}`,
              Body: Buffer.from(file.buffer, 'binary'),
              ACL: 'public-read',
              ContentType: file.mime,
            },
            (err, data) => {
              if (err) {
                return reject(err);
              }

              // set the bucket file url
              file.url = data.Location;

              resolve();
            }
          );
        });
      },
      delete: file => {
        return new Promise((resolve, reject) => {
          // delete file on S3 bucket
          const path = file.path ? `${file.path}/` : '';
          S3.deleteObject(
            {
              Key: `${path}${file.hash}${file.ext}`,
            },
            (err, data) => {
              if (err) {
                return reject(err);
              }

              resolve();
            }
          );
        });
      },
    };
  },
};
