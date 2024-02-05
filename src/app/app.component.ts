import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SignaturePadComponent } from './component/shared/signature-pad/signature-pad.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SignaturePadComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppComponent {
  title = 'angular-library';
}
