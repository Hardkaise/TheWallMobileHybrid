// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { result, app } = context;

    if (result.agreement === true) {
      app.service('/relations').create({
        createdBy: result.createdBy,
        membersId: [ result.createdBy, result.withUser ]
      }).then(() => context);
    }
    else
      return context;
  };
}
