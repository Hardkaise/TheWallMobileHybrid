import { Application } from '../declarations';
import users from './users/users.service';
import imageCommentaries from './image-commentaries/image-commentaries.service';
import images from './images/images.service';
import likes from './likes/likes.service';
import notifications from './notifications/notifications.service';
import tags from './tags/tags.service';
import uploadImages from './upload-images/upload-images.service';
// Don't remove this comment. It's needed to format import lines nicely.

export default function (app: Application) {
  app.configure(users);
  app.configure(imageCommentaries);
  app.configure(images);
  app.configure(likes);
  app.configure(notifications);
  app.configure(tags);
  app.configure(uploadImages);
}
