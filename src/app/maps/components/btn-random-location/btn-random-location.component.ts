import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-btn-random-location',
  templateUrl: './btn-random-location.component.html',
  styleUrl: './btn-random-location.component.css',
})
export class BtnRandomLocationComponent {
  private placesService = inject(PlacesService);
  private mapService = inject(MapService);

  public goToRandomLocation() {
    if (!this.placesService.isUserLocationReady)
      throw Error('No se encontró la ubicación');
    if (!this.mapService.isMapReady) throw Error('No se encontró el mapa');
    this.mapService.flyTo([(Math.random() - 0.5) * 360, (Math.random() - 0.5) * 100]);
  }
}
