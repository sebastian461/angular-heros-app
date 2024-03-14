import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Heroe } from '../../interfaces/heroe.interface';

@Component({
  selector: 'heroes-heroe-page',
  templateUrl: './heroe-page.component.html',
  styles: [],
})
export class HeroePageComponent implements OnInit {
  public heroe?: Heroe;

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroeById(id)))
      .subscribe((heroe) => {
        if (!heroe) return this.router.navigate(['/heroes/list']);
        this.heroe = heroe;
        console.log({ heroe });

        return;
      });
  }

  goBack(): void {
    this.router.navigateByUrl('heroes/list');
  }
}
