import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'heroes-new-page',
  templateUrl: './new-page.component.html',
  styles: [],
})
export class NewPageComponent implements OnInit {
  //formulario reactivo
  public heroeForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', { nonNullable: true }),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  public publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  constructor(
    private heroeService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) return;

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroeService.getHeroeById(id)))
      .subscribe((heroe) => {
        if (!heroe) return this.router.navigateByUrl('/');
        this.heroeForm.reset(heroe);
        return;
      });
  }

  get getCurrentHeroe(): Heroe {
    const heroe = this.heroeForm.value as Heroe;
    return heroe;
  }

  onSubmit(): void {
    if (this.heroeForm.invalid) return;
    if (this.getCurrentHeroe.id) {
      this.heroeService.updateHeroe(this.getCurrentHeroe).subscribe((h) => {
        //TODO mostrar snackbar
      });
      return;
    }

    this.heroeService.addHeroe(this.getCurrentHeroe).subscribe((h) => {
      //TODO mostrar snackbar y navegar a heroes/edit/heroe.id
    });
  }
}
