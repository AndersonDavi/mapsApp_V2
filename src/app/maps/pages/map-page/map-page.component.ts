import { Component, inject } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-map-page',
  templateUrl: './map-page.component.html',
  styleUrl: './map-page.component.css',
})
export class MapPageComponent {
  private placesService = inject(PlacesService);

  get isUserLocationReady(): boolean {
    return this.placesService.isUserLocationReady;
  }
}
