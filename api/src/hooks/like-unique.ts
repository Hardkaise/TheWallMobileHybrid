// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';
const errors = require('@feathersjs/errors');

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { data, app } = context;

    if (data['ownerId'] !== undefined && data['imageId'] !== undefined){
      const likes = await app.service('/likes').find({
        paginate: false,
        query: {
          ownerId: data['ownerId'],
          imageId: data['imageId']
        }
      });
      if (likes.length != 0)
        throw new errors.FeathersError('Need to be unique', 'NotUnique', 401, 'NotUnique', {
        ownerId: data['ownerId'],
        imageId: data['imageId']
      });
    }
    return context;
  };
}
