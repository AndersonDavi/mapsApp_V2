import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map: Map | undefined;
  private markers: Marker[] = [];
  get isMapReady() {
    return !!this.map;
  }
  setMap(map: Map) {
    this.map = map;
  }
  getMap() {
    return this.map;
  }

  flyTo(coords: LngLatLike) {
    if (!this.isMapReady) throw Error('El mapa no esta inicializado');
    this.map?.flyTo({ center: coords, zoom: 14, speed: 1.5 });
  }

  createMarkersFromPlaces(places: Feature[], userLocation: LngLatLike) {
    if (!this.isMapReady) throw Error('El mapa no esta inicializado');
    this.markers.forEach((marker) => marker.remove());
    const newMarkers = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(`
      <h6>${place.text_es}</h6>
      <span>${place.place_name_es}</span>
      <p>${place.center}</p>
      `);
      const color = '#xxxxxx'.replace(/x/g, () =>
        ((Math.random() * 16) | 0).toString(16)
      );
      const newMarker = new Marker({ color: color, draggable: false })
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map!);
      newMarkers.push(newMarker);
    }
    this.markers = newMarkers;
    const bounds = new LngLatBounds();
    newMarkers.forEach((marker) => {
      bounds.extend(marker.getLngLat());
    });
    this.map?.fitBounds(bounds, {
      speed: 2,
      padding: 100,
    });
  }

  createMarker(marker: Marker) {
    if (!this.isMapReady) throw Error('El mapa no esta inicializado');
    marker.addTo(this.map!);
  }
  constructor() {}
}
