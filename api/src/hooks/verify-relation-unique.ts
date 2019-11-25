// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
const errors = require('@feathersjs/errors');

export = function (fields:any, queryOptions = {}) {
  return async (context: HookContext) => {
    const { service, data } = context;
    const query: any = {};

    fields.forEach((f: any) => query[f] = data[f]);
    return service.find({
      query: {
        ...query,
        ...queryOptions
      }
    }).then(result => {
      if (result.total > 0) {
        throw new errors.FeathersError('Need to be unique', 'NotUnique', 401, 'NotUnique', {
          match: result.data
        });
      } else {
        return context;
      }
    });
  };
}
