import { Routes } from '@angular/router';
import { SignaturePadComponent } from './component/shared/signature-pad/signature-pad.component';
import { ImageCropperComponent } from './component/image-cropper/image-cropper.component';

export const APP_ROUTES: Routes = [
  { path: 'image-cropper', component: ImageCropperComponent },
];
