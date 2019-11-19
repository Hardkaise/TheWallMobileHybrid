// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';

export default function (app: Application) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({

    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    roles: { type: String, enum: ['viewer', 'admin'], default: 'viewer' },
    picture: { type: String, default: 'blank.png' },
    about: { type: String, default: '' }

  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
}
