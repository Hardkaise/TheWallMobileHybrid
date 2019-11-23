import * as authentication from '@feathersjs/authentication';
import createRelation from '../../hooks/create-relation';
import generateNotification from '../../hooks/generate-notification';
import verifyRelationUnique from '../../hooks/verify-relation-unique';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [verifyRelationUnique(['createdBy', 'withUser'], { agreement: { $nin: [true, false] }})],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [generateNotification()],
    update: [],
    patch: [createRelation()],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
