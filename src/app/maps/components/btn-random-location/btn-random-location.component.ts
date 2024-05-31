import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { LngLat, LngLatLike, Marker, Popup } from 'mapbox-gl';

@Component({
  selector: 'app-btn-random-location',
  templateUrl: './btn-random-location.component.html',
  styleUrl: './btn-random-location.component.css',
})
export class BtnRandomLocationComponent {
  private placesService = inject(PlacesService);
  private mapService = inject(MapService);
  private lastPlaceMarker?: Marker;

  public goToRandomLocation() {
    if (!this.placesService.isUserLocationReady)
      throw Error('No se encontró la ubicación');
    if (!this.mapService.isMapReady) throw Error('No se encontró el mapa');

    const color = '#xxxxxx'.replace(/x/g, () =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const coords: LngLatLike = [
      (Math.random() - 0.5) * 360,
      (Math.random() - 0.5) * 100,
    ];
    const newPopUp = new Popup().setHTML(
      `<h6>Coordenadas</h6>  <span>${coords}</span>`
    );
    const newMarker = new Marker({ color: color, draggable: false })
      .setLngLat(coords)
      .setPopup(newPopUp);
    if (this.lastPlaceMarker) this.lastPlaceMarker?.remove();
    this.lastPlaceMarker = newMarker;
    this.mapService.createMarker(newMarker);
    this.mapService.flyTo(coords);
  }
}
