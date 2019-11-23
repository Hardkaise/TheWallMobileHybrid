// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const {result, app, params} = context;

    return app.service('images').create({
      ownerId: params.user._id,
      fileId: result.id,
    }).then(() => context);
  };
}
