import { Injectable, inject } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private placesApi = inject(PlacesApiClient);
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
    if (!this.userLocation) throw Error('No se encuentra la ubicación');

    this.isLoadingPlaces = true;
    this.placesApi
      .get<PlacesResponse>(`/${query}.json`, {
        params: {
          proximity: this.userLocation.join(','),
        },
      })
      .subscribe((resp) => {
        // console.log(resp.features);
        this.places = resp.features;
        this.isLoadingPlaces = false;
        // this.places.forEach((place) => {
        //   console.log(
        //     `${place.text_es}\n${place.center}`
        //   );
        // });
      });
  }
}
