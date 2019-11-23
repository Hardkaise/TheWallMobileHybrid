// image-commentaries-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';

export default function (app: Application) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const imageCommentaries = new Schema({
    ownerId: { type: String, required: true},
    imageId: { type: String, required: true},
    text: { type: String, required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('imageCommentaries', imageCommentaries);
}
