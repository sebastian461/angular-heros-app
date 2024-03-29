import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';
import { filter, switchMap, tap } from 'rxjs';

import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

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
    private router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
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
        this.showSnakcbar(`${h.superhero} updated`);
      });
      return;
    }

    this.heroeService.addHeroe(this.getCurrentHeroe).subscribe((h) => {
      this.showSnakcbar(`${h.superhero} created`);
      this.router.navigate(['/heroes/edit', h.id]);
    });
  }

  onDeleteHeroe(): void {
    if (!this.getCurrentHeroe.id) throw Error('Heroe is requiered');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroeForm.value,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() =>
          this.heroeService.deleteHeroeById(this.getCurrentHeroe.id)
        ),
        filter((wasDeleted: boolean) => wasDeleted)
      )
      .subscribe((result) => {
        this.router.navigate(['/heroes']);
      });

    /* dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.heroeService
        .deleteHeroeById(this.getCurrentHeroe.id)
        .subscribe((wasDeleted) => {
          if (wasDeleted) {
            this.router.navigate(['/heroes']);
          }
        });
    }); */
  }

  showSnakcbar(message: string): void {
    this.snackbar.open(message, 'done', { duration: 2500 });
  }
}
