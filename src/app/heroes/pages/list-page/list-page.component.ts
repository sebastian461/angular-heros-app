import { Component, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'heroes-list-page',
  templateUrl: './list-page.component.html',
  styles: [],
})
export class ListPageComponent implements OnInit {
  public heroes: Heroe[] = [];

  constructor(private heroeService: HeroesService) {}

  ngOnInit(): void {
    this.heroeService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }
}
