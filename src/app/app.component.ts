import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgxGpAutocompleteDirective, NgxGpAutocompleteModule } from "@angular-magic/ngx-gp-autocomplete";
import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,NgxGpAutocompleteModule],
  providers:[{
    provide: Loader,
    useValue: new Loader({
      apiKey: 'AIzaSyAFaylOBsuhYPYw9YqWmhN370xTvc6DXYU',
      libraries: ['places']
    })
  },],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  options:any

  @ViewChild('ngxPlaces') placesRef!: NgxGpAutocompleteDirective;

  public handleAddressChange(place: google.maps.places.PlaceResult) {
    // Do some stuff
  }
}
