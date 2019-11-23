// Initializes the `relation-requests` service on path `/relation-requests`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { RelationRequests } from './relation-requests.class';
import createModel from '../../models/relation-requests.model';
import hooks from './relation-requests.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'relation-requests': RelationRequests & ServiceAddons<any>;
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
  app.use('/relation-requests', new RelationRequests(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('relation-requests');

  service.hooks(hooks);
}
