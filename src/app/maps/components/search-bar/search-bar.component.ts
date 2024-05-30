import { AfterViewInit, Component, inject } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent implements AfterViewInit{
  private placesService = inject(PlacesService);
  private debounceTimer?: NodeJS.Timeout;

  ngAfterViewInit(): void {
    this.onSearch('Plaza de la paz')
  }


  onSearch(query: string = '') {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      this.placesService.getPlacesByQUery(query);
    }, 250);
  }
}
