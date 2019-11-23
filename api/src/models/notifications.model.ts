// notifications-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';

export default function (app: Application) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const notifications = new Schema({
    ownerId: { type: Schema.ObjectId, required: true },
    receiverIds: { type: [ Schema.ObjectId ], required: true},
    targetId: { type: Schema.ObjectId, required: true },
    targetType: { type: String, enum: [ 'relation-requests', 'images'], required: true },
    read: { type: Boolean, default: false },
    data: { type: String, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('notifications', notifications);
}
