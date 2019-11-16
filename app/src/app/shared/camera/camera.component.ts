import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

export class CameraComponent {

    constructor(private camera: Camera) { }

    options: CameraOptions = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      async getPicture() {
       return this.camera.getPicture(this.options).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64 (DATA_URL):
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            return base64Image;
           }, (err) => {
            // Handle error
           });    
      }
}