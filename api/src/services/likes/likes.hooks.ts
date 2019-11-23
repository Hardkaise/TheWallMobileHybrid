import * as authentication from '@feathersjs/authentication';
import generateNotification from "../../hooks/generate-notification";
import likeUnique from '../../hooks/like-unique';
// Don't remove this comment. It's needed to format import lines nicely.

const { authenticate } = authentication.hooks;

export default {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [likeUnique()],
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
    patch: [],
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
