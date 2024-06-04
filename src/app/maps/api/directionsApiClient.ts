import { HttpClient, HttpHandler, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class DirectionsApiClient extends HttpClient {
  public baseUrl = 'https://api.mapbox.com/directions/v5/mapbox/driving';
  constructor(handler: HttpHandler) {
    super(handler);
  }
  public override get<T>(url: string) {
    url = this.baseUrl + url;

    return super.get<T>(url, {
      params: {
        alternatives: false,
        geometries: 'geojson',
        language: 'es',
        overview: 'full',
        steps: false,
        access_token: environment.MAP_BOX_KEY,
      },
    });
  }
}
