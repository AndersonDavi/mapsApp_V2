import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';
import { Feature, PlacesResponse } from '../interfaces/places';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  public http = inject(HttpClient);
  public userLocation?: [number, number];
  public isLoadingPlaces: boolean = false;
  public places: Feature[] = [];
  get isUserLocationReady(): boolean {
    return !!this.userLocation;
  }
  constructor() {
    this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setTimeout(() => {
            this.userLocation = [coords.longitude, coords.latitude];
            resolve(this.userLocation);
          }, 500);
        },
        (error) => {
          alert(error);
          console.log(error);
          reject();
        }
      );
    });
  }

  getPlacesByQUery(query: string = '') {
    this.isLoadingPlaces = true;
    this.http
      .get<PlacesResponse>(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=8&proximity=-74.79775802365373%2C10.994877668352984&language=es&access_token=${environment.MAP_BOX_KEY}
    `
      )
      .subscribe((resp) => {
        console.log(resp.features);
        this.places = resp.features;
        this.isLoadingPlaces = false;
      });
  }
}
