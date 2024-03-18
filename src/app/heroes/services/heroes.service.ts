import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Heroe } from '../interfaces/heroe.interface';
import { enviroments } from 'src/environments/environments';

@Injectable({ providedIn: 'root' })
export class HeroesService {
  private baseUrl: string = enviroments.baseUrl;

  constructor(private httpClient: HttpClient) {}

  getHeroes(): Observable<Heroe[]> {
    return this.httpClient.get<Heroe[]>(`${this.baseUrl}/heroes`);
  }

  getHeroeById(id: string): Observable<Heroe | undefined> {
    return this.httpClient
      .get<Heroe>(`${this.baseUrl}/heroes/${id}`)
      .pipe(catchError((error) => of(undefined)));
  }

  getSuggestions(query: string): Observable<Heroe[]> {
    return this.httpClient.get<Heroe[]>(
      `${this.baseUrl}/heroes?q=${query}&_limit=6`
    );
  }

  addHeroe(heroe: Heroe): Observable<Heroe> {
    return this.httpClient.post<Heroe>(`${this.baseUrl}/heroes`, heroe);
  }

  updateHeroe(heroe: Heroe): Observable<Heroe> {
    if (!heroe.id) throw Error('Heroe is required');
    return this.httpClient.patch<Heroe>(
      `${this.baseUrl}/heroes/${heroe.id}`,
      heroe
    );
  }

  deleteHeroeById(id: string): Observable<boolean> {
    return this.httpClient.delete(`${this.baseUrl}/heroes/${id}`).pipe(
      catchError((err) => of(false)),
      map((resp) => true)
    );
  }
}
