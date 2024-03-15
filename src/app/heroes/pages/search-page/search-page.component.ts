import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'heroes-search-page',
  templateUrl: './search-page.component.html',
  styles: [],
})
export class SearchPageComponent {
  public searchInput = new FormControl('');
  public heroes: Heroe[] = [];
  public selectedHeroe?: Heroe;

  constructor(private heroeService: HeroesService) {}

  searchHeroe(): void {
    const value: string = this.searchInput.value || '';

    this.heroeService
      .getSuggestions(value)
      .subscribe((heroes) => (this.heroes = heroes));
  }

  onSelectedOption(event: MatAutocompleteSelectedEvent): void {
    if (!event.option.value) {
      this.selectedHeroe = undefined;
      return;
    }

    const heroe: Heroe = event.option.value;
    this.searchInput.setValue(heroe.superhero);
    this.selectedHeroe = heroe;
  }
}
