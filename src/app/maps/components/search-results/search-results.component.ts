import { Component, inject } from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';
import { LngLatLike } from 'mapbox-gl';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css',
})
export class SearchResultsComponent {
  private placesSerivice = inject(PlacesService);
  private mapService = inject(MapService);

  get isLoadingPLaces(): boolean {
    return this.placesSerivice.isLoadingPlaces;
  }
  get places(): Feature[] {
    return this.placesSerivice.places;
  }

  public flyTo(place: Feature) {
    const [lng, lat] = place.center;
    this.mapService.flyTo([lng, lat]);
  }
}
