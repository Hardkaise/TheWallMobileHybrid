// relations-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';

export default function (app: Application) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const relations = new Schema({
    createdBy: { type: Schema.ObjectId, required: true, unique: true },
    membersId: { type: [Schema.ObjectId], required: true }
  }, {
    timestamps: true
  });

  return mongooseClient.model('relations', relations);
}
