import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { Platform, ActionSheetController } from '@ionic/angular';
import { FilePath } from '@ionic-native/file-path/ngx';
// import { Storage } from '@ionic/storage';

export class CameraUtils {

  constructor(private camera: Camera,
    private actionSheetController: ActionSheetController,
    private platform: Platform,
    // private file: File,
    private filePath: FilePath,
    // private storage: Storage,
  ) { }

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
  takepictureCamera() {
    this.takePicture(this.camera.PictureSourceType.CAMERA);

  }
  getPictureFromLibrary() {
    this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);

  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  // updateStoredImages(name) {
  //     this.storage.get(STORAGE_KEY).then(images => {
  //         let arr = JSON.parse(images);
  //         if (!arr) {
  //             let newImages = [name];
  //             this.storage.set(STORAGE_KEY, JSON.stringify(newImages));
  //         } else {
  //             arr.push(name);
  //             this.storage.set(STORAGE_KEY, JSON.stringify(arr));
  //         }

  //         let filePath = this.file.dataDirectory + name;
  //         let resPath = this.pathForImage(filePath);

  //         let newEntry = {
  //             name: name,
  //             path: resPath,
  //             filePath: filePath
  //         };

  //         this.images = [newEntry, ...this.images];
  //         this.ref.detectChanges(); // trigger change detection cycle
  //     });
  // }

  //  copyFileToLocalDir(namePath, currentName, newFileName) {
  //     this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
  //         this.updateStoredImages(newFileName);
  //     }, error => {
  //         this.presentToast('Error while storing file.');
  //     });
  // }
  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      console.log(imagePath)

      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            console.log(filePath)
            // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    });

  }
}