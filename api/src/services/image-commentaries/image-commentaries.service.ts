// Initializes the `image-commentaries` service on path `/image-commentaries`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { ImageCommentaries } from './image-commentaries.class';
import createModel from '../../models/image-commentaries.model';
import hooks from './image-commentaries.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'image-commentaries': ImageCommentaries & ServiceAddons<any>;
  }
}

export default function (app: Application) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/image-commentaries', new ImageCommentaries(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('image-commentaries');

  service.hooks(hooks);
}
