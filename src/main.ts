import { AppModule } from './app/app.module';
import { environment } from './environments/environments';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import mapboxgl from 'mapbox-gl';

if (!navigator.geolocation) {
  alert('Geolocation is not supported by this browser.');
  throw new Error('Geolocation is not supported by this browser.');
}

mapboxgl.accessToken = environment.MAP_BOX_KEY ?? '';
if (!mapboxgl.accessToken) {
  throw new Error('Mapbox access token is not defined');
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
