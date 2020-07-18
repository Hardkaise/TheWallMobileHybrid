// Initializes the `notifications` service on path `/notifications`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { Notifications } from './notifications.class';
import createModel from '../../models/notifications.model';
import hooks from './notifications.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'notifications': Notifications & ServiceAddons<any>;
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
  app.use('/notifications', new Notifications(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('notifications');

  service.hooks(hooks);
}