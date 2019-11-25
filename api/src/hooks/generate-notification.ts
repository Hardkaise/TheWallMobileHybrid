// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
import { Hook, HookContext } from '@feathersjs/feathers';

export default (options = {}): Hook => {
  return async (context: HookContext) => {
    const { result, app, path } = context;

    if (path === 'images') {
      const user = await app.service('/users').get(result.ownerId);
      const relations = await app.service('/relations').find({
        paginate: false,
        query: {
          membersId: { $in: [ user._id ]}
        }
      });

      if (relations.length === 0)
        return context;

      let relationsWith: string[] = [];
      relations.forEach((value: any) => {
        value.membersId.forEach((valueMember:any) => {
          if (valueMember.toString() != user._id)
            relationsWith.push(valueMember);
        });
      });
      return app.service('/notifications').create({
        ownerId: result.ownerId,
        receiverIds: relationsWith,
        targetId: result._id,
        targetType: 'images',
        read:  false,
        data: "A new image has been uploaded by " + user.userName
      }).then(() => context);
    }
    else if (path === 'relation-requests') {
      const user = await app.service('/users').get(result.createdBy);

      return app.service('/notifications').create({
        ownerId: result.createdBy,
        receiverIds: result.withUser,
        targetId: result._id,
        targetType: 'relation-requests',
        read: false,
        data: user.userName + ' would like to be your friend !'
      }).then(() => context)
    } else if (path === 'image-commentaries') {
      const user = await app.service('/users').get(result.ownerId);
      const image = await app.service('/images').get(result.imageId);

      if (result.ownerId.toString() === image.ownerId.toString())
        return context;
      return app.service('/notifications').create({
        ownerId: result.ownerId,
        receiverIds: image.ownerId,
        targetId: result._id,
        targetType: 'image-commentaries',
        read: false,
        data: user.userName + ' has commented your post !'
      }).then(() => context);
    }
    else if (path === 'likes') {
      const user = await app.service('/users').get(result.ownerId);
      const image = await app.service('/images').get(result.imageId);

      if (result.ownerId.toString() === image.ownerId.toString())
        return context;

      return app.service('/notifications').create({
        ownerId: result.ownerId,
        receiverIds: image.ownerId,
        targetId: result._id,
        targetType: 'likes',
        read: false,
        data: user.userName + ' has liked your post !'
      }).then(() => context);
    }
  };
}
