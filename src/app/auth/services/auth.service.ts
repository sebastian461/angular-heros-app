import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { enviroments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = enviroments.baseUrl;
  private user?: User;

  constructor(private httpClient: HttpClient) {}

  get currentUser(): User | undefined {
    if (!this.user) return undefined;

    return structuredClone(this.user); //como usar el operador {...}
  }

  login(email: string, password: string): Observable<User> {
    //this.httpClient.post(ruta, {email, password});

    return this.httpClient.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user) => {
        this.user = user;
      }),
      tap((user) => {
        localStorage.setItem('token', 'asdasdasd|DASaff456a4sd|s65a4f4AD4A4AS');
      })
    );
  }

  checkAuthentication(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);

    const token = localStorage.getItem('token');

    return this.httpClient.get<User>(`${this.baseUrl}/users/1`).pipe(
      tap((user) => (this.user = user)),
      map((user) => !!user),
      catchError((err) => of(false))
    );
  }

  logout(): void {
    this.user = undefined;
    localStorage.clear();
  }
}
