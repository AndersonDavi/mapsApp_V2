import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';
import { LngLatLike } from 'mapbox-gl';
import { Route } from '../../interfaces/directions';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent {
  public selectedId = '';
  private placesSerivice = inject(PlacesService);
  private mapService = inject(MapService);

  get isLoadingPLaces(): boolean {
    return this.placesSerivice.isLoadingPlaces;
  }
  get places(): Feature[] {
    return this.placesSerivice.places;
  }
  public flyTo(place: Feature) {
    this.selectedId = place.id;
    const [lng, lat] = place.center;
    this.mapService.flyTo([lng, lat]);
  }

  getRouteBetweenPoinys(place: Feature) {
    if (!this.placesSerivice.userLocation)
      throw Error('No se encontró la ubicación actual');
    const start = this.placesSerivice.userLocation!;
    const end = place.center as [number, number];
    this.mapService.getRouteBetweenPoinys(start, end);
  }

   
}
