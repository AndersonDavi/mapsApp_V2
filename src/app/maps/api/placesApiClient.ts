import {
  HttpClient,
  HttpHandler,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class PlacesApiClient extends HttpClient {
  public baseUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
  constructor(handler: HttpHandler) {
    super(handler);
  }
  public override get<T>(
    url: string,
    options: {
      params?:
        | HttpParams
        | {
            [param: string]:
              | string
              | number
              | boolean
              | ReadonlyArray<string | number | boolean>;
          };
    }
  ) {
    url = this.baseUrl + url;

    return super.get<T>(url, {
      params: {
        limit: 8,
        language: 'es',
        access_token: environment.MAP_BOX_KEY,
        ...options.params,
      },
    });
  }
}
// `/${query}.json?limit=8&proximity=-74.79775802365373%2C10.994877668352984&language=es&access_token=${environment.MAP_BOX_KEY}
