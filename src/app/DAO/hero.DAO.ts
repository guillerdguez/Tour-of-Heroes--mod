import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hero } from '../Model/Domain/hero';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class heroDAO {
  private heroesUrl = 'api/heroes';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  /////////// CREATE methods ///////////

  addHero(hero: Hero): Observable<Hero> {
 
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions);
  }

  /////////// READ methods ///////////

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  getHeroNo404<Data>(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/?id=${id}`;
    return this.http.get<Hero>(url);
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url);
  }

  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`);
  }

  /////////// UPDATE methods ///////////

  updateHero(hero: Hero): Observable<any> {   console.log(hero);
    return this.http.put(this.heroesUrl, hero, this.httpOptions);
  }
  /////////// DELETE methods ///////////

  deleteHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, this.httpOptions);
  }
}
