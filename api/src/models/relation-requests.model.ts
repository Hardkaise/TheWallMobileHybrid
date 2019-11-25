// relation-requests-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from '../declarations';

export default function (app: Application) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const relationRequests = new Schema({
    agreement: { type: Boolean, default: null },
    members: { type: [String], required: true },
    createdBy: { type: String, required: true },
    withUser: { type: String, required: true }
  }, {
    timestamps: true
  });
  return mongooseClient.model('relationRequests', relationRequests);
}
