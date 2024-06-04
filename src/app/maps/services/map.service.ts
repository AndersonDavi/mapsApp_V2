import { Injectable, inject } from '@angular/core';
import {
  AnySourceData,
  LngLat,
  LngLatBounds,
  LngLatLike,
  Map,
  Marker,
  Popup,
} from 'mapbox-gl';
import { Feature } from '../interfaces/places';
import { DirectionsApiClient } from '../api';
import { Directions, Route } from '../interfaces/directions';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private directionsApi = inject(DirectionsApiClient);
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
  clearMarkers() {
    this.markers.forEach((marker) => marker.remove());
  }
  createMarkersFromPlaces(places: Feature[], userLocation: LngLatLike) {
    if (!this.isMapReady) throw Error('El mapa no esta inicializado');
    this.clearMarkers();
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

  getRouteBetweenPoinys(start: [number, number], end: [number, number]) {
    this.directionsApi
      .get<Directions>(`/${start.join(',')};${end.join(',')}`)
      .subscribe((resp) => {
        if (resp.routes.length > 0) this.drawPolyline(resp.routes[0]);
      });
  }

  drawPolyline(route: Route) {
    console.log({ kms: route.distance / 1000, duration: route.duration / 60 });
    if (!this.map) throw Error('Mapa no encontrado');

    const coords = route.geometry.coordinates;
    const bounds = new LngLatBounds();
    coords.forEach(([lng, lat]) => {
      bounds.extend([lng, lat]);
    });

    this.map.fitBounds(bounds, {
      padding: 200,
    });
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        ],
      },
    };

    if (this.map.getLayer('RouteString')) {
      this.map.removeLayer('RouteString');
      this.map.removeSource('RouteString');
    }
    this.map.addSource('RouteString', sourceData);
    this.map.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': 'black',
        'line-width': 3,
      },
    });
  }
}
