// Initializes the `upload-images` service on path `/upload-images`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { UploadImages } from './upload-images.class';
import createModel from '../../models/upload-images.model';
import hooks from './upload-images.hooks';
const AWS = require('aws-sdk');
const S3BlobStore = require('s3-blob-store');
const BlobService = require('feathers-blob');

AWS.config.logger = console;

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'upload-images': UploadImages & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const s3 = new AWS.S3({
    endpoint: process.env.S3_ENDPOINT,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  });

  const blobStore = S3BlobStore({
    client: s3,
    bucket: process.env.S3_BUCKET
  });

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/upload-images', BlobService({ Model: blobStore }));
  //app.use('/upload-images', new UploadImages(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('upload-images');

  service.hooks(hooks);
}
