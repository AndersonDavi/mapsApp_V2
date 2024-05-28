import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

if (!navigator.geolocation) {
  alert('Geolocation is not supported by this browser.');
  throw new Error('Geolocation is not supported by this browser.');
}
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken =
  'pk.eyJ1IjoiYWRkcnVlZGE4OSIsImEiOiJjbHY3NnE3aG0wNmxjMmtxOG84NWoyNTJsIn0.QWIrQQ7Z2EoMvepMOzDM6A';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
