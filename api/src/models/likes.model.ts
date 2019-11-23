// likes-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';

export default function (app: Application) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const likes = new Schema({
    ownerId: { type: Schema.ObjectId, required: true},
    imageId: { type: Schema.ObjectId, required: true}
  }, {
    timestamps: true
  });

  return mongooseClient.model('likes', likes);
}
