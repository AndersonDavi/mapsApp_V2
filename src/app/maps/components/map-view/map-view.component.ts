import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  inject,
} from '@angular/core';
import { MapService, PlacesService } from '../../services';
import { Map, Marker, Popup } from 'mapbox-gl';

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.css',
})
export class MapViewComponent implements AfterViewInit {
  private mapService = inject(MapService);
  private placesService = inject(PlacesService);

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef;

  ngAfterViewInit(): void {
    console.log(this.placesService.userLocation);
    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });
    const popup = new Popup({ closeOnClick: false }).setHTML(
      `
      <h3>Aqui estoy!</h3>
      <p>Estoy en esta ebucación</p>
      `
    );
    new Marker({
      color: 'red',
    })
      .setLngLat(this.placesService.userLocation!)
      .setPopup(popup)
      .addTo(map);
    this.mapService.setMap(map);
  }
}
