import { AfterViewInit, Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularCropperjsModule, CropperComponent } from 'angular-cropperjs';

@Component({
  selector: 'app-image-cropper',
  standalone: true,
  imports: [CommonModule, AngularCropperjsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './image-cropper.component.html',
  styleUrls: ['./image-cropper.component.css']
})
export class ImageCropperComponent implements OnInit {
  @ViewChild("angularCropper") public angularCropper!: CropperComponent;

  @Input() cropperOptions = {
            // dragMode: "crop",
    aspectRatio: 1,
    autoCrop: true,
    movable: true,
    zoomable: true,
    scalable: true,
    autoCropArea: 0.8,
    cropBoxResizable: false,
    // widthOfCropper: '800',
    // heightOfCropper: '515',
    dragMode: 'move',
    minCropBoxWidth: 420,
    minCropBoxHeight: 230,
    // data:{
    //   width: 800,
    //   height:  515,
    // },
  };
  @Input() sourceImage =
    "https://www.sky.com/assets2/the-flash-tile-e2718a42jpg";
  // @Input() sourceImage = 'https://fengyuanchen.github.io/cropperjs/images/picture.jpg';

  @Output() result = new EventEmitter<string>();

  scaleValX = 1;
  scaleValY = 1;
  croppedImage: any = null;

  ngOnInit() {
    setTimeout(() => {
      this.angularCropper.cropperOptions = this.cropperOptions
      this.angularCropper.imageUrl = this.sourceImage;
      console.log('image croper', this.angularCropper);
    }, 1000);
  }

  // ngAfterViewInit() {
  //   this.angularCropper.cropperOptions = {
  //     dragMode: "crop",
  //     aspectRatio: 1,
  //     autoCrop: true,
  //     movable: true,
  //     zoomable: true,
  //     scalable: true,
  //     autoCropArea: 0.8
  //   };
  //   this.angularCropper.imageUrl = this.sourceImage;
  //   console.log('image croper', this.angularCropper);
  //   // this.angularCropper.cropper.zoom(0.1);
  // }

  upload($event: any): void {
    console.log("TCL: ImageCropperComponent -> constructor -> event", $event);
    if ($event.target.files && $event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.sourceImage = e.target.result;
      };
      reader.readAsDataURL($event.target.files[0]);
      this.angularCropper.cropperOptions = this.cropperOptions;
      this.angularCropper.imageUrl = this.sourceImage;
    }
  }

  cl($event: any) {
    console.log($event);
  }

  crop() {
    let croppedImgB64String: string = this.angularCropper.cropper
      .getCroppedCanvas()
      .toDataURL("image/jpeg", 100 / 100);
    console.log(croppedImgB64String);
    this.croppedImage = croppedImgB64String;
    this.result.emit(this.croppedImage);
  }

  reset() {
    this.angularCropper.cropper.reset();
  }

  clear() {
    this.angularCropper.cropper.clear();
  }

  rotate(degree: number) {
    this.angularCropper.cropper.rotate(degree);
  }

  zoom(zoomIn: boolean) {
    let factor = zoomIn ? 0.1 : -0.1;
    this.angularCropper.cropper.zoom(factor);
  }

  scaleX() {
    this.scaleValX = this.scaleValX * -1;
    this.angularCropper.cropper.scaleX(this.scaleValX);
  }

  scaleY() {
    this.scaleValY = this.scaleValY * -1;
    this.angularCropper.cropper.scaleY(this.scaleValY);
  }

  move(x: number, y: number) {
    this.angularCropper.cropper.move(x, y);
  }
}
