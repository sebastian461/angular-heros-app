import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroe.interface';

@Pipe({
  name: 'heroeImage',
})
export class HeroeImagePipe implements PipeTransform {
  transform(heroe: Heroe): string {
    if (!heroe.id && !heroe.alt_img) {
      return 'assets/no-image.png';
    }

    if (heroe.alt_img) return heroe.alt_img; //https

    return `assets/heroes/${heroe.id}.jpg`;
  }
}
